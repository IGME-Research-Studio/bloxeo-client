import _ from 'lodash';
// import io from 'socket.io-client';
import reqwest from 'reqwest';
import Promise from 'bluebird';
import assign from 'object-assign';
import { browserHistory } from 'react-router';
import { equals, and, not, isNil } from 'ramda';
import { EventEmitter } from 'events';

import io from '../io';
import AppDispatcher from '../dispatcher/AppDispatcher';
import StormConstants from '../constants/StormConstants';
import StormActions from '../actions/StormActions';
import UserStore from './UserStore';

// Init socket.io connection
// const socket = io.connect(StormConstants.SERVER_URL);
const socket = io;
let currentBoardId = '';
let receivedIdeas = false;
let receivedCollections = false;

let token = '';
let errorMsg = '';
const ERROR_CHANGE_EVENT = 'JOIN_ERROR';
const VALIDATE_ERROR = 'VALIDATE_ERROR';

const SocketStore = assign({}, EventEmitter.prototype, {
  valid: true,
  /**
   * Get join error message
   * @return {array}
   */
  getErrorMessage: function() {
    return errorMsg;
  },
  emitChange: function() {
    this.emit(ERROR_CHANGE_EVENT);
  },
  emitValidError: function() {
    this.emit(VALIDATE_ERROR);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addErrorListener: function(callback) {
    this.on(ERROR_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeErrorListener: function(callback) {
    this.removeListener(ERROR_CHANGE_EVENT, callback);
  },
  addValidateListener: function(callback) {
    this.on(VALIDATE_ERROR, callback);
    if (!this.valid) this.emit(VALIDATE_ERROR);
  },
  removeValidateListener: function(callback) {
    this.removeListener(VALIDATE_ERROR, callback);
  },
});

/**
 * Checks a socket response for an error
 * @param {object} data: response data
 */
function resolveSocketResponse(data) {
  return new Promise((resolve, reject) => {
    if (data.code < 300) {
      resolve(data);
    }
    else {
      reject(new Error(data.message));
    }
  });
}

socket.on('connect', () => {
  socket.emit('GET_CONSTANTS');
});

socket.on('RECEIVED_CONSTANTS', (body) => {
  const { EVENT_API, REST_API } = body;

  /**
   * Checks to update the client to the server
   * turn REST_API into route templates
   */
  const Routes = _.mapValues(REST_API, (route) => {
    return _.template(StormConstants.SERVER_URL + route[1]);
  });

  // Socket Handlers
  // Idea was added or removed from collection
  socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      StormActions.receivedCollections(
        _.omit(res.data, ['top', 'left', 'key']),
        false
      );
    })
    .catch((res) => {
      console.error(`Error updating collections: ${res}`);
    });
  });

  // Idea was added or removed
  socket.on(EVENT_API.UPDATED_IDEAS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      const ideas = res.data.map((idea) => {
        return idea.content;
      });
      StormActions.updatedIdeas(ideas);
    })
    .catch((res) => {
      console.error(`Error updating ideas: ${res}`);
    });
  });

  socket.on(EVENT_API.JOINED_ROOM, (data) => {
    console.log(data);
    resolveSocketResponse(data)
    .then(() => {
      const reqObj = {
        boardId: currentBoardId,
        userToken: token,
      };
      socket.emit(EVENT_API.GET_IDEAS, reqObj);
      socket.emit(EVENT_API.GET_COLLECTIONS, reqObj);
      errorMsg = '';
      SocketStore.emitChange();

      if (window.location.hash.split('?')[0] !== '/room') {
        browserHistory.push(`/room/${currentBoardId}`);
      }

      // @XXX we shouldn't just set the href like this
      // removed it bc I can't think of a case where this is necessary
      //
      // Append the board id to the url upon joining a room
      // if it is not already there
      // if (window.location.hash.split('?')[0] !== '#/workSpace') {
      //   const newUrl = window.location.href.split('?')[0] +
      //     `workSpace?roomId=${currentBoardId}`;
      //   window.location.href = newUrl;
      // }
    })
    .catch((res) => {
      console.error(`Error joining a room: ${res}`);
      errorMsg = res.message;
      SocketStore.emitChange();
    });
  });

  socket.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      StormActions.receivedCollections(res.data, receivedCollections);

      receivedCollections = true;
      if (receivedIdeas) {
        StormActions.endLoadAnimation();
      }
    })
    .catch((res) => {
      console.error(`Error receiving collections: ${res}`);
    });
  });

  socket.on(EVENT_API.RECEIVED_IDEAS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      const ideas = res.data.map((idea) => {
        return idea.content;
      });
      StormActions.updatedIdeas(ideas);

      receivedIdeas = true;
      if (receivedCollections) {
        StormActions.endLoadAnimation();
      }
    })
    .catch((res) => {
      console.error(`Error receiving ideas: ${res}`);
    });
  });

  /**
   * API call to create a user
   * @returns {Promise<Object|Error>}
   */
  function createUser(name) {
    return reqwest({
      url: Routes.createUser(),
      method: REST_API.createUser[0],
      data: { username: name },
    })
    .then((res) => {
      console.dir(res);
      UserStore.setUserData(res.token, name);
      token = res;
      return res;
    })
    .fail((err, res) => {
      console.error(err, res);
      throw new Error(err);
    });
  }

  /**
   * Request Functions
   * Creates a user
   * @param {string} name
   * @returns {Promise}
   */
  function getOrCreateUser(name) {
    console.log(name);
    if (!UserStore.getUserToken()) {
      return createUser(name);
    }
    else {
      token = UserStore.getUserToken();
      return Promise.resolve(token);
    }
  }

  /**
   * Validates a user token
   */
  // function validateUser() {
  //   return new Promise((resolve, reject) => {
  //     if (UserStore.getUserToken()) {
  //       reqwest({
  //         url: Routes.validateUser(),
  //         method: REST_API.validateUser[0],
  //         data: { userToken: UserStore.getUserToken()},
  //         success: () => {
  //           console.log(UserStore.getUserToken());
  //           token = UserStore.getUserToken();
  //           SocketStore.valid = true;
  //           resolve(true);
  //         },
  //         error: () => {
  //           UserStore.clearUserData();
  //           SocketStore.valid = false;
  //           reject(new Error('User did not validate'));
  //         },
  //       });
  //     }
  //     else {
  //       reject(new Error('No cached user data'));
  //     }
  //   });
  // }

  /**
   * Joins board of given id
   * @param {string} boardId
   */
  function joinBoard(boardId) {
    // @XXX WUT?
    [receivedCollections, receivedIdeas] = [false, false];
    currentBoardId = boardId;
    console.log('This boardId ', boardId, token);
    socket.emit(
      EVENT_API.JOIN_ROOM,
      {
        boardId: currentBoardId,
        userToken: token,
      });
  }

  /**
   * Create new board
   */
  function createBoard() {
    return reqwest({
      url: Routes.createBoard(),
      method: REST_API.createBoard[0],
      data: { userToken: token },
      success: (res) => {
        joinBoard(res.boardId);
      },
    });
  }

  /**
   * Make post request to server for idea creation
   * @param {string} ideaContent
   */
  function addIdea(content) {
    socket.emit(
      EVENT_API.CREATE_IDEA,
      {
        boardId: currentBoardId,
        content: content,
        userToken: token,
      }
    );
  }

  /**
   * Creates a collection with the given idea
   * @param {string} collection content from first idea added to collection
   */
  function addCollection(content, left, top) {
    socket.emit(
      EVENT_API.CREATE_COLLECTION,
      {
        boardId: currentBoardId,
        content: content,
        userToken: token,
        top: top,
        left: left,
      }
    );
  }

  /**
   * Remove collection of given index from board
   * @param {number} index
   */
  function removeCollection(_key) {
    socket.emit(
      EVENT_API.DESTROY_COLLECTION,
      {
        boardId: currentBoardId,
        userToken: token,
        key: _key,
      }
    );
  }

  /**
   * Adds an idea to a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function addIdeaToCollection(_key, content) {
    socket.emit(
      EVENT_API.ADD_IDEA,
      {
        boardId: currentBoardId,
        key: _key,
        content: content,
        userToken: token,
      }
    );
  }

  /**
   * Removes an idea from a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function removeIdeaFromCollection(_key, content) {
    socket.emit(
      EVENT_API.REMOVE_IDEA,
      {
        boardId: currentBoardId,
        content: content,
        userToken: token,
        key: _key,
      }
    );
  }

  // Set up action watchers
  AppDispatcher.register((action) => {
    switch (action.actionType) {
    case StormConstants.CREATE_BOARD:
      getOrCreateUser(action.userName)
      .then(() => createBoard());
      break;
    case StormConstants.JOIN_BOARD:
      getOrCreateUser(action.userName)
      .then(() => { joinBoard(action.boardId);});
      break;
    case StormConstants.GET_IDEAS:
      socket.emit(EVENT_API.GET_IDEAS, {boardId: currentBoardId });
      break;
    case StormConstants.GET_COLLECTIONS:
      socket.emit(EVENT_API.GET_COLLECTIONS, {boardId: currentBoardId });
      break;
    case StormConstants.IDEA_CREATE:
      addIdea(action.ideaContent.trim());
      break;
    case StormConstants.GROUP_IDEAS:
      addIdeaToCollection(action.id, action.idea.content);
      break;
    case StormConstants.COLLECTION_CREATE:
      addCollection(action.idea.content, action.left, action.top);
      break;
    case StormConstants.REMOVE_COLLECTION:
      removeCollection(action.id);
      break;
    case StormConstants.SEPARATE_IDEAS:
      removeIdeaFromCollection(action.groupID, action.ideaContent);
      break;
    default:
    }
  });

  // @XXX client should handle failure instead of active checking
  // validateUser()
  // .then(() => {

  const namespace = window.location.pathname.split('/')[1];
  const boardId = window.location.pathname.split('/')[2];

  // console.log(`pathname`);
  // console.log(window.location.pathname.split('/'));
  // console.log(`namespace ${namespace}`);
  // console.log(`boardId ${boardId}`);

  // If boardId exists e.g. not just /room
  if (and(equals(namespace, 'room'), not(isNil(boardId)))) {
    console.log('doing the thing', boardId);
    joinBoard(boardId);
  }
  // })
  // .catch(() => { SocketStore.emitValidError();});
});

module.exports = SocketStore;
