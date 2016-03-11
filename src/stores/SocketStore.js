import 'whatwg-fetch';
import _ from 'lodash';
import Promise from 'bluebird';
import assign from 'object-assign';
import { equals, either, not, compose, isNil } from 'ramda';
import { EventEmitter } from 'events';
import { browserHistory } from 'react-router';

import io from '../io';
import AppDispatcher from '../dispatcher/AppDispatcher';
import StormActions from '../actions/StormActions';
import UserStore from './UserStore';
import StormConstants from '../constants/StormConstants';
import API from '../constants/APIConstants';
import { post, checkSocketStatus,
  checkHTTPStatus } from '../utils/checkStatus';

// A socket.io connection singleton
const socket = io;

const isntNil = compose(not, isNil);
const { EVENT_API, REST_API } = API;

/**
 * Checks to update the client to the server
 * turn REST_API into route templates
 */
const Routes = _.mapValues(REST_API, (route) => {
  return _.template(StormConstants.SERVER_URL + route[1]);
});

let receivedIdeas = false;
let receivedCollections = false;
let currentBoardId = undefined;
let errorMsg = undefined;

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

// Socket Handlers
// Idea was added or removed from collection
socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
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
  checkSocketStatus(data)
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

  checkSocketStatus(data)
  .then(() => {
    const reqObj = {
      boardId: currentBoardId,
      userToken: UserStore.getUserToken(),
    };
    errorMsg = undefined;

    socket.emit(EVENT_API.GET_IDEAS, reqObj);
    socket.emit(EVENT_API.GET_COLLECTIONS, reqObj);
    socket.emit(EVENT_API.GET_OPTIONS, reqObj);
    SocketStore.emitChange();

    browserHistory.push(`/room/${currentBoardId}`);
  })
  .catch((res) => {
    console.error(`Error joining a room: ${res}`);
    errorMsg = res.message;
    SocketStore.emitChange();
  });
});

socket.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
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
  checkSocketStatus(data)
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

socket.on(EVENT_API.RECEIVED_OPTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    console.log(res);
    StormActions.changeRoomOptions(res.data);
  })
  .catch((res) => {
    console.error(`Error receiving options: ${res}`);
  });
});

/**
 * Joins board of given id
 * @param {string} boardId
 */
function joinBoard(boardId) {
  // @XXX WUT?
  [receivedCollections, receivedIdeas] = [false, false];
  currentBoardId = boardId;

  socket.emit(
    EVENT_API.JOIN_ROOM,
    {
      boardId: boardId,
      userToken: UserStore.getUserToken(),
    });
}

/**
 * Leave board of given id
 * @param {string} boardId
 */
function leaveBoard(boardId) {
  // @XXX WUT?
  [receivedCollections, receivedIdeas] = [false, false];
  currentBoardId = undefined;

  socket.emit(
    EVENT_API.LEAVE_ROOM,
    {
      boardId: boardId,
      userToken: UserStore.getUserToken(),
    });
}

/**
 * Create new board
 */
function createBoard(boardName, boardDesc) {

  return post(Routes.createBoard(),
              { userToken: UserStore.getUserToken(),
                name: boardName,
                description: boardDesc,
              })
  .then(checkHTTPStatus);
}

/**
 * API call to create a user
 * @returns {Promise<Object|Error>}
 */
function createUser(name) {

  return post(Routes.createUser(), { username: name })
    .then(checkHTTPStatus)
    .then((res) => {
      UserStore.setUserData(res.token, name);
      return res;
    })
    .catch((err) => {
      console.error(err.stack);
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
  const maybeToken = UserStore.getUserToken();
  const maybeName = UserStore.getUserName();

  if (either(isNil(maybeToken), not(equals(maybeName, name)))) {
    return createUser(name);
  }
  else {
    return Promise.resolve(maybeToken);
  }
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
      userToken: UserStore.getUserToken(),
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
      userToken: UserStore.getUserToken(),
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
      userToken: UserStore.getUserToken(),
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
      userToken: UserStore.getUserToken(),
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
      userToken: UserStore.getUserToken(),
      key: _key,
    }
  );
}

socket.on('connect', () => {
  console.info(socket.id);
});

socket.on('disconnect', () => {
  console.info('disconnected');

  if (isntNil(currentBoardId)) {
    leaveBoard(currentBoardId);
  }
});

// Set up action watchers
AppDispatcher.register((action) => {
  switch (action.actionType) {
  case StormConstants.CREATE_BOARD:
    getOrCreateUser(action.username)
    .then(() => createBoard(action.boardName, action.boardDesc))
    .then((res) => joinBoard(res.boardId))
    .catch((e) => {
      console.error(e);
    });
    break;

  case StormConstants.JOIN_BOARD:
    getOrCreateUser(action.username)
    .then(() => joinBoard(action.boardId));
    break;

  case StormConstants.LEAVE_BOARD:
    socket.emit(EVENT_API.LEAVE_BOARD, { boardId: currentBoardId });
    break;

  case StormConstants.GET_IDEAS:
    socket.emit(EVENT_API.GET_IDEAS, { boardId: currentBoardId });
    break;

  case StormConstants.GET_COLLECTIONS:
    socket.emit(EVENT_API.GET_COLLECTIONS, { boardId: currentBoardId });
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

module.exports = SocketStore;
