import Promise from 'bluebird';
import { equals, or, not, isNil } from 'ramda';
import { browserHistory } from 'react-router';

import io from '../io';
import d from '../dispatcher/AppDispatcher';
import API from '../constants/APIConstants';
import UserStore from './UserStore';
import BoardOptionsStore from './UserStore';
import actionTypes from '../constants/actionTypes';
import { post, checkHTTPStatus } from '../utils/checkStatus';

const { REST_API, EVENT_API } = API;

/**
 * Joins board of given id
 * @param {string} boardId
 */
function joinBoard(boardId) {
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
      boardId: BoardOptionsStore.getBoardId(),
      content: content,
      userToken: UserStore.getUserToken(),
    }
  );
}

function destroyIdea(content) {
  io.emit(
    EVENT_API.DESTROY_IDEA,
    {
      boardId: BoardOptionsStore.getBoardId(),
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
      boardId: BoardOptionsStore.getBoardId(),
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
      boardId: BoardOptionsStore.getBoardId(),
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
      boardId: BoardOptionsStore.getBoardId(),
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
      boardId: BoardOptionsStore.getBoardId(),
      content: content,
      userToken: UserStore.getUserToken(),
      key: _key,
    }
  );
}

// Set up action watchers
d.register(({ type, payload }) => {
  switch (type) {
  case actionTypes.CREATE_BOARD:
    getOrCreateUser(payload.username)
    .then(({ token }) =>
        createBoard(token, payload.boardName, payload.boardDesc))
    .then(({ boardId }) =>
        browserHistory.push(`/room/${boardId}/workspace`));
    break;

  case actionTypes.VALIDATE_BOARD:
    getOrCreateUser(payload.username)
    .then(() => checkBoardExists(payload.boardId))
    .then(({ exists }) => {
      if (exists) {
        browserHistory.push(`/room/${payload.boardId}/workspace`);
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
      boardId: BoardOptionsStore.getBoardId(),
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

module.exports = {};
