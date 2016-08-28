import _ from 'lodash';
import Promise from 'bluebird';
import assign from 'object-assign';
import { equals, or, not, isNil } from 'ramda';
import { EventEmitter } from 'events';
import { browserHistory } from 'react-router';

import io from '../io';
import { changeRoomOptions, updatedIdeas,
  receivedCollections, endLoadAnimation,  } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';
import UserStore from './UserStore';
import actionTypes from '../constants/actionTypes';
import API from '../constants/APIConstants';
import { post, checkSocketStatus,
  checkHTTPStatus } from '../utils/checkStatus';

const { EVENT_API, REST_API } = API;

let currentBoardId = undefined;

const ERROR_CHANGE_EVENT = 'JOIN_ERROR';
const VALIDATE_ERROR = 'VALIDATE_ERROR';

const SocketStore = assign({}, EventEmitter.prototype, {

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
io.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(receivedCollections(
      {
        collections: _.omit(res.data, ['top', 'left', 'key']),
        reset: false,
      }
    ));
  })
  .catch((res) => {
    console.error(`${res} Updating the collections.`);
  });
});

// Idea was added or removed
io.on(EVENT_API.UPDATED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(updatedIdeas({ ideas: res.data }));
  })
  .catch((res) => {
    console.error(`${res}. Updating the ideas.`);
  });
});

io.on(EVENT_API.JOINED_ROOM, (data) => {
  console.log(data);

  checkSocketStatus(data)
  .then((res) => {

    d.dispatch(updatedIdeas({ ideas: res.data.ideas }));
    d.dispatch(receivedCollections({
      collections: res.data.collections, reset: false }));
    d.dispatch(changeRoomOptions({ updates: res.data.room }));

    d.dispatch(endLoadAnimation(true));
  });
});

io.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {

    d.dispatch(receivedCollections({
      collections: res.data,
      reset: false }));
  })
  .catch((res) => {
    console.error(`Error receiving collections: ${res}`);
  });
});

io.on(EVENT_API.RECEIVED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(updatedIdeas({ ideas: res.data }));
  })
  .catch((res) => {
    console.error(`Error receiving ideas: ${res}`);
  });
});

io.on(EVENT_API.UPDATED_BOARD, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(changeRoomOptions({ updates: res.data }));
  })
  .catch((res) => {
    console.error(`Error receiving update: ${res}`);
  });
});

io.on(EVENT_API.RECEIVED_OPTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(changeRoomOptions({ updates: res.data }));
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
  currentBoardId = boardId;

  io.emit(
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
  currentBoardId = undefined;

  io.emit(
    EVENT_API.LEAVE_ROOM,
    {
      boardId: boardId,
      userToken: UserStore.getUserToken(),
    });
}

/**
 * Create new board
 */
function createBoard(userToken, boardName, boardDesc) {

  return post(REST_API.createBoard(), { userToken, boardName, boardDesc })
  .then(checkHTTPStatus);
}

function checkBoardExists(boardId) {
  return fetch(REST_API.checkBoardExists(boardId))
  .then(checkHTTPStatus);
}

/**
 * API call to create a user
 * @returns {Promise<Object|Error>}
 */
function createUser(name) {

  return post(REST_API.createUser(), { username: name })
    .then(checkHTTPStatus)
    .then((res) => {
      UserStore.setUserData({token: res.token,
                            userId: res.userId,
                            username: name});
      return Promise.resolve(res);
    });
}

/**
 * Request Functions
 * Creates a user
 * @param {string} name
 * @returns {Promise}
 */
function getOrCreateUser(name) {
  const { maybeToken, maybeName, maybeId } = UserStore.getUserData();

  if (or(isNil(maybeToken), not(equals(maybeName, name)))) {
    return createUser(name);
  }
  else {
    return Promise.resolve({ maybeToken, maybeName, maybeId });
  }
}

/**
 * Make post request to server for idea creation
 * @param {string} ideaContent
 */
function createIdea(content) {
  io.emit(
    EVENT_API.CREATE_IDEA,
    {
      boardId: currentBoardId,
      content: content,
      userToken: UserStore.getUserToken(),
    }
  );
}

function destroyIdea(content) {
  io.emit(
    EVENT_API.DESTROY_IDEA,
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
  io.emit(
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
  io.emit(
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
  io.emit(
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
  io.emit(
    EVENT_API.REMOVE_IDEA,
    {
      boardId: currentBoardId,
      content: content,
      userToken: UserStore.getUserToken(),
      key: _key,
    }
  );
}

io.on('connect', () => {
  console.info(`Connection ${io.id}`);
});

io.on('disconnect', () => {
  console.info(`Disconnected, was on ${currentBoardId}`);
});

io.on('reconnect', () => {
  console.info(`Reconnection ${io.id}, was on ${currentBoardId}`);
});

// Set up action watchers
d.register(({ type, payload }) => {
  switch (type) {
  case actionTypes.CREATE_BOARD:
    getOrCreateUser(payload.username)
    .then(({ token }) => createBoard(token, payload.boardName, payload.boardDesc))
    .then(({ boardId }) => browserHistory.push(`/room/${boardId}`))
    break;

  case actionTypes.VALIDATE_BOARD:
    getOrCreateUser(payload.username)
    .then(() => checkBoardExists(payload.boardId))
    .then(({ exists }) => {
      if (exists) {
        browserHistory.push(`/room/${payload.boardId}`);
      }
      else {
        // TODO: snackbar error or validation error message?
        console.error(`Room ${payload.boardId} does not exist`);
      }
    });
    break;

  case actionTypes.JOIN_BOARD:
    joinBoard(payload.boardId, payload.userToken);
    break;

  case actionTypes.LEAVE_BOARD:
    leaveBoard(payload.boardId);
    break;

  case actionTypes.UPDATE_BOARD:
    io.emit(EVENT_API.UPDATE_BOARD, {
      boardId: currentBoardId,
      userToken: UserStore.getUserToken(),
      updates: payload,
    });
    break;

  case actionTypes.CREATE_IDEA:
    createIdea(payload.content.trim());
    break;

  case actionTypes.DESTROY_IDEA:
    destroyIdea(payload.content);
    break;

  case actionTypes.GROUP_IDEAS:
    addIdeaToCollection(payload.ideaId, payload.idea.content);
    break;

  case actionTypes.CREATE_COLLECTION:
    addCollection(payload.ideaContent,
                  payload.left,
                  payload.top);
    break;

  case actionTypes.REMOVE_COLLECTION:
    removeCollection(payload.collectionId);
    break;

  case actionTypes.SEPARATE_IDEAS:
    removeIdeaFromCollection(payload.groupId, payload.content);
    break;

  default:
  }
});

module.exports = SocketStore;
