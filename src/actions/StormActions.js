import { createAction } from 'redux-actions';

import Dispatcher from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

export const createUser = createAction(actionTypes.CREATE_USER);

export const createBoard = createAction(actionTypes.CREATE_BOARD);
export const updateBoard = createAction(actionTypes.UPDATE_BOARD);
export const joinBoard = createAction(actionTypes.JOIN_BOARD);
export const validateBoard = createAction(actionTypes.VALIDATE_BOARD);
export const leaveBoard = createAction(actionTypes.LEAVE_BOARD);

export const endLoadAnimation = createAction(actionTypes.END_LOAD_ANIMATION);

export const changeRoomOptions = createAction(actionTypes.CHANGE_ROOM_OPTS);
export const changeRoomName = createAction(actionTypes.CHANGE_ROOM_NAME);
export const changeRoomDescription = createAction(actionTypes.CHANGE_ROOM_DESCRIPTION);

export const groupIdeas = createAction(actionTypes.GROUP_IDEA);
export const separateIdeas = createAction(actionTypes.SEPARATE_IDEAS);
export const createIdeas = createAction(actionTypes.CREATE_IDEA);
export const destroyIdeas = createAction(actionTypes.DESTROY_IDEA);
export const updatedIdeas = createAction(actionTypes.UPDATED_IDEAS);

export const hideCollections = createAction(actionTypes.HIDE_COLLECTIONS);
export const moveCollection = createAction(actionTypes.MOVE_COLLECTION);
export const removeCollection = createAction(actionTypes.REMOVE_COLLECTION);
export const createCollection = createAction(actionTypes.CREATE_COLLECTION);
export const addCollection = createAction(actionTypes.ADD_COLLECTION);
export const addedCollection = createAction(actionTypes.ADDED_COLLECTION);
export const modifiedCollection = createAction(actionTypes.MODIFIED_COLLECTION);
export const removedCollection = createAction(actionTypes.REMOVED_COLLECTION);
export const receivedCollections= createAction(actionTypes.RECEIVED_COLLECTIONS);

export const setLayoutSize = createAction(actionTypes.SET_LAYOUT_SIZE);

export const storeResults = createAction(actionTypes.STORE_RESULTS);
export const returnResults = createAction(actionTypes.RETURN_RESULTS);

// TODO remove in lieu of routing
export const toggleWorkspace = createAction(actionTypes.SELECT_TAB);

const StormActions = {
  /**
   * Dispatch create new user
   */
  createUser: function(username) {
    Dispatcher.dispatch({
      type: actionTypes.CREATE_USER,
      username: username,
    });
  },

  /**
   * Dispatch create new board event
   * @param {Object} requestData { username, boardName, boardDesc }
   */
  createBoard: function(requestData) {
    Dispatcher.dispatch({
      type: actionTypes.CREATE_BOARD,
      ...requestData,
    });
  },

  updateBoard: function(requestData) {
    Dispatcher.dispatch({
      type: actionTypes.UPDATE_BOARD,
      updates: requestData,
    });
  },

  /**
   * Dispatch join board event
   * @param {string} id of board to join
   */
  joinBoard: function(boardId, userToken) {
    Dispatcher.dispatch({
      type: actionTypes.JOIN_BOARD,
      boardId: boardId,
      userToken: userToken,
    });
  },

  validateBoard: function(boardId, username) {
    Dispatcher.dispatch({
      type: actionTypes.VALIDATE_BOARD,
      boardId: boardId,
      username: username,
    });
  },

  leaveBoard: function(boardId) {
    Dispatcher.dispatch({
      type: actionTypes.LEAVE_BOARD,
      boardId: boardId,
    });
  },

  /**
  * Dispatch set bank loaded event
  */
  endLoadAnimation: function() {
    Dispatcher.dispatch({
      type: actionTypes.END_LOAD_ANIMATION,
    });
  },

  changeRoomOptions: function(updates) {
    Dispatcher.dispatch({
      type: actionTypes.CHANGE_ROOM_OPTS,
      updates: updates,
    });
  },

  /**
   * Dispatch change room name event
   * @param {string} roomName
   */
  changeRoomName: function(roomName) {
    Dispatcher.dispatch({
      type: actionTypes.CHANGE_ROOM_NAME,
      roomName: roomName,
    });
  },

  /**
   * Dispatch change room description event
   * @param {string} description
   */
  changeRoomDescription: function(roomDesc) {
    Dispatcher.dispatch({
      type: actionTypes.CHANGE_ROOM_DESCRIPTION,
      roomDesc: roomDesc,
    });
  },

  /**
   * Dispatch idea create event
   * @param {string} ideaContent
   */
  createIdea: function(ideaContent) {
    Dispatcher.dispatch({
      type: actionTypes.CREATE_IDEA,
      ideaContent: ideaContent,
    });
  },

  destroyIdea: function({ ideaContent }) {
    Dispatcher.dispatch(
      createAction(actionTypes.DESTROY_IDEA)({ ideaContent })
    );
  },

  /**
   * Dispatch timer countdown event
   */
  countdown: function() {
    Dispatcher.dispatch({
      type: actionTypes.TIMER_COUNTDOWN,
    });
  },

  /**
   * Dispatch pause timer event
   * @param {boolean} pause
   */
  pauseTimer: function(isPaused) {
    Dispatcher.dispatch({
      type: actionTypes.TIMER_PAUSE,
      isPaused: isPaused,
    });
  },

  createCollection: function({ideaContent, left, top}) {
    Dispatcher.dispatch(
      createAction(actionTypes.CREATE_COLLECTION)({ideaContent, left, top})
    );
  },

  storeWorkspace: function(workspace) {
    Dispatcher.dispatch({
      type: actionTypes.STORE_WORKSPACE,
      workspace: workspace,
    });
  },

  groupIdea: function(id, idea) {
    Dispatcher.dispatch({
      type: actionTypes.GROUP_IDEAS,
      idea: idea,
      id: id,
    });
  },

  separateIdeas: function(groupID, ideaContent) {
    Dispatcher.dispatch({
      type: actionTypes.SEPARATE_IDEAS,
      groupID: groupID,
      ideaContent: ideaContent,
    });
  },

  /**
   * Dispatch event to hide collections with the given ids
   * @param {number[]} ids - array of ids to hide
   */
  hideCollections: function(ids) {
    Dispatcher.dispatch({
      type: actionTypes.HIDE_COLLECTIONS,
      ids: ids,
    });
  },

  /**
   * Dispatch event to set voting results
   * @param {object[]} results - voting results
   */
  storeResults: function(results) {
    Dispatcher.dispatch({
      type: actionTypes.STORE_RESULTS,
      results: results,
    });
  },

  /**
   * Dispatch event return results to the workspace
   * @param {object[]} results - voting results
   */
  returnResults: function(results) {
    Dispatcher.dispatch({
      type: actionTypes.RETURN_RESULTS,
      results: results,
    });
  },

  /**
   * Dispatch event to select a tab
   */
  toggleWorkspace: function(isOnWorkspace) {
    Dispatcher.dispatch({
      type: actionTypes.SELECT_TAB,
      isOnWorkspace,
    });
  },

  /**
   * Dispatch event to move a collection
   * @param {number} ids - collection to move
   * @param {number} left - collection new left
   * @param {number} right - collection new right
   */
  moveCollection: function(id, left, top) {
    Dispatcher.dispatch({
      type: actionTypes.MOVE_COLLECTION,
      id: id,
      left: left,
      top: top,
    });
  },

  /**
   * Dispatch event to remove a collection with given id
   * @param {number} id - collection to remove
   */
  removeCollection: function(id) {
    Dispatcher.dispatch({
      type: actionTypes.REMOVE_COLLECTION,
      id: id,
    });
  },

  /**
   * Dispatch event add idea collections
   * @param {object[]} collections - collections to add
   */
  addCollections: function(collections) {
    Dispatcher.dispatch({
      type: actionTypes.ADD_COllECTIONS,
      collections: collections,
    });
  },

  /**
   * Dispatch event to remove a collection with given id
   * @param {number} id - collection to remove
   */
  setLayoutSize: function(width, height) {
    Dispatcher.dispatch({
      type: actionTypes.SET_LAYOUT_SIZE,
      width: width,
      height: height,
    });
  },

  // SOCKET ACTIONS
  // Collections
  /**
   * Dispatch event to add a collection
   * @param {number} index - position in collections array
   * @param {array} content - content of collection
   */
  addedCollection: function(index, content, left, top) {
    Dispatcher.dispatch({
      type: actionTypes.ADDED_COLLECTION,
      index: index,
      content: content,
      top: top,
      left: left,
    });
  },

  /**
   * Dispatch event to update a collection
   * @param {number} index - position in collections array
   * @param {array} content - content of collection
   */
  modifiedCollection: function(index, content) {
    Dispatcher.dispatch({
      type: actionTypes.MODIFIED_COLLECTION,
      index: index,
      content: content,
    });
  },

  /**
   * Dispatch event to remove a collection
   * @param {number} index - position in collections array
   */
  removedCollection: function(index) {
    Dispatcher.dispatch({
      type: actionTypes.REMOVED_COLLECTION,
      index: index,
    });
  },

  /**
   * Dispatch event to update collections
   * @param {array} collections - all collections
   */
  receivedCollections: function(collections, reset) {
    Dispatcher.dispatch({
      type: actionTypes.RECEIVED_COLLECTIONS,
      collections: collections,
      reset: reset,
    });
  },

  // IDEAS
  /**
   * Dispatch event to update ideas
   * @param {array} ideas - all ideas
   */
  updatedIdeas: function(ideas) {
    Dispatcher.dispatch({
      type: actionTypes.UPDATED_IDEAS,
      ideas: ideas,
    });
  },
};

module.exports = StormActions;
