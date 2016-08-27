import _ from 'lodash';
import Promise from 'bluebird';
import assign from 'object-assign';
import { equals, or, not, isNil } from 'ramda';
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
socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    StormActions.receivedCollections(
      _.omit(res.data, ['top', 'left', 'key']),
      false
    );
  })
  .catch((res) => {
    console.error(`${res} Updating the collections.`);
  });
});

// Idea was added or removed
socket.on(EVENT_API.UPDATED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    StormActions.updatedIdeas(res.data);
  })
  .catch((res) => {
    console.error(`${res}. Updating the ideas.`);
  });
});

socket.on(EVENT_API.JOINED_ROOM, (data) => {

  checkSocketStatus(data)
  .then((res) => {
    StormActions.updatedIdeas(res.data.ideas);
    StormActions.receivedCollections(res.data.collections, false);
    StormActions.changeRoomOptions(res.data.room);

    StormActions.endLoadAnimation();
  });
});

socket.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {

    StormActions.receivedCollections(res.data, receivedCollections);
  })
  .catch((res) => {
    console.error(`Error receiving collections: ${res}`);
  });
});

socket.on(EVENT_API.RECEIVED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    StormActions.updatedIdeas(res.data);
  })
  .catch((res) => {
    console.error(`Error receiving ideas: ${res}`);
  });
});

socket.on(EVENT_API.UPDATED_BOARD, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    StormActions.changeRoomOptions(res.data);
  })
  .catch((res) => {
    console.error(`Error receiving update: ${res}`);
  });
});

socket.on(EVENT_API.RECEIVED_OPTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
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
  socket.emit(
    EVENT_API.CREATE_IDEA,
    {
      boardId: currentBoardId,
      content: content,
      userToken: UserStore.getUserToken(),
    }
  );
}

function destroyIdea(content) {
  socket.emit(
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
  console.info(`Connection ${socket.id}`);
});

socket.on('disconnect', () => {
  console.info(`Disconnected, was on ${currentBoardId}`);
});

socket.on('reconnect', () => {
  console.info(`Reconnection ${socket.id}, was on ${currentBoardId}`);
});

// Set up action watchers
AppDispatcher.register((action) => {
  switch (action.type) {
  case StormConstants.CREATE_BOARD:
    getOrCreateUser(action.username)
    .then(({ token }) => createBoard(token, action.boardName, action.boardDesc))
    .then(({ boardId }) => browserHistory.push(`/room/${boardId}`))
    .catch((e) => {
      console.error(e);
    });
    break;

  case StormConstants.VALIDATE_BOARD:
    getOrCreateUser(action.username)
    .then(() => checkBoardExists(action.boardId))
    .then(({ exists }) => {
      if (exists) {
        browserHistory.push(`/room/${action.boardId}`);
      }
      else {
        // TODO: snackbar error or validation error message?
        console.error(`Room ${action.boardId} does not exist`);
      }
    });
    break;

  case StormConstants.JOIN_BOARD:
    joinBoard(action.boardId, action.userToken);
    break;

  case StormConstants.LEAVE_BOARD:
    leaveBoard(action.boardId);
    break;

  case StormConstants.UPDATE_BOARD:
    socket.emit(EVENT_API.UPDATE_BOARD, {
      boardId: currentBoardId,
      userToken: UserStore.getUserToken(),
      updates: action.updates,
    });
    break;

  case StormConstants.GET_IDEAS:
    socket.emit(EVENT_API.GET_IDEAS, { boardId: currentBoardId });
    break;

  case StormConstants.GET_COLLECTIONS:
    socket.emit(EVENT_API.GET_COLLECTIONS, { boardId: currentBoardId });
    break;

  case StormConstants.CREATE_IDEA:
    createIdea(action.ideaContent.trim());
    break;

  case StormConstants.DESTROY_IDEA:
    destroyIdea(action.payload.ideaContent);
    break;

  case StormConstants.GROUP_IDEAS:
    addIdeaToCollection(action.id, action.idea.content);
    break;

  case StormConstants.CREATE_COLLECTION:
    addCollection(action.payload.ideaContent,
                  action.payload.left,
                  action.payload.top);
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
