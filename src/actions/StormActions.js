import { createAction } from 'redux-actions';

import Dispatcher from '../dispatcher/AppDispatcher';
import ActTypes from '../constants/StormConstants';

const StormActions = {
  /**
   * Dispatch create new user
   */
  createUser: function(username) {
    Dispatcher.dispatch({
      type: ActTypes.CREATE_USER,
      username: username,
    });
  },

  /**
   * Dispatch create new board event
   * @param {Object} requestData { username, boardName, boardDesc }
   */
  createBoard: function(requestData) {
    Dispatcher.dispatch({
      type: ActTypes.CREATE_BOARD,
      ...requestData,
    });
  },

  updateBoard: function(requestData) {
    Dispatcher.dispatch({
      type: ActTypes.UPDATE_BOARD,
      updates: requestData,
    });
  },

  /**
   * Dispatch join board event
   * @param {string} id of board to join
   */
  joinBoard: function(boardId, username) {
    Dispatcher.dispatch({
      type: ActTypes.JOIN_BOARD,
      boardId: boardId,
      username: username,
    });
  },

  leaveBoard: function(boardId) {
    Dispatcher.dispatch({
      type: ActTypes.LEAVE_BOARD,
      boardId: boardId,
    });
  },

  /**
  * Dispatch set bank loaded event
  */
  endLoadAnimation: function() {
    Dispatcher.dispatch({
      type: ActTypes.END_LOAD_ANIMATION,
    });
  },

  changeRoomOptions: function(updates) {
    Dispatcher.dispatch({
      type: ActTypes.CHANGE_ROOM_OPTS,
      updates: updates,
    });
  },

  /**
   * Dispatch change room name event
   * @param {string} roomName
   */
  changeRoomName: function(roomName) {
    Dispatcher.dispatch({
      type: ActTypes.CHANGE_ROOM_NAME,
      roomName: roomName,
    });
  },

  /**
   * Dispatch change room description event
   * @param {string} description
   */
  changeRoomDescription: function(roomDesc) {
    Dispatcher.dispatch({
      type: ActTypes.CHANGE_ROOM_DESCRIPTION,
      roomDesc: roomDesc,
    });
  },

  /**
   * Dispatch idea create event
   * @param {string} ideaContent
   */
  ideaCreate: function(ideaContent) {
    Dispatcher.dispatch({
      type: ActTypes.IDEA_CREATE,
      ideaContent: ideaContent,
    });
  },

  /**
   * Dispatch timer countdown event
   */
  countdown: function() {
    Dispatcher.dispatch({
      type: ActTypes.TIMER_COUNTDOWN,
    });
  },

  /**
   * Dispatch pause timer event
   * @param {boolean} pause
   */
  pauseTimer: function(isPaused) {
    Dispatcher.dispatch({
      type: ActTypes.TIMER_PAUSE,
      isPaused: isPaused,
    });
  },

  createCollection: function({ideaContent, left, top}) {
    Dispatcher.dispatch(
      createAction(ActTypes.CREATE_COLLECTION)({ideaContent, left, top})
    );
  },

  storeWorkspace: function(workspace) {
    Dispatcher.dispatch({
      type: ActTypes.STORE_WORKSPACE,
      workspace: workspace,
    });
  },

  groupIdea: function(id, idea) {
    Dispatcher.dispatch({
      type: ActTypes.GROUP_IDEAS,
      idea: idea,
      id: id,
    });
  },

  separateIdeas: function(groupID, ideaContent) {
    Dispatcher.dispatch({
      type: ActTypes.SEPARATE_IDEAS,
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
      type: ActTypes.HIDE_COLLECTIONS,
      ids: ids,
    });
  },

  /**
   * Dispatch event to set voting results
   * @param {object[]} results - voting results
   */
  storeResults: function(results) {
    Dispatcher.dispatch({
      type: ActTypes.STORE_RESULTS,
      results: results,
    });
  },

  /**
   * Dispatch event return results to the workspace
   * @param {object[]} results - voting results
   */
  returnResults: function(results) {
    Dispatcher.dispatch({
      type: ActTypes.RETURN_RESULTS,
      results: results,
    });
  },

  /**
   * Dispatch event to select a tab
   */
  toggleWorkspace: function(isOnWorkspace) {
    Dispatcher.dispatch({
      type: ActTypes.SELECT_TAB,
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
      type: ActTypes.MOVE_COLLECTION,
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
      type: ActTypes.REMOVE_COLLECTION,
      id: id,
    });
  },

  /**
   * Dispatch event add idea collections
   * @param {object[]} collections - collections to add
   */
  addCollections: function(collections) {
    Dispatcher.dispatch({
      type: ActTypes.ADD_COllECTIONS,
      collections: collections,
    });
  },

  /**
   * Dispatch event to remove a collection with given id
   * @param {number} id - collection to remove
   */
  setLayoutSize: function(width, height) {
    Dispatcher.dispatch({
      type: ActTypes.SET_LAYOUT_SIZE,
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
      type: ActTypes.ADDED_COLLECTION,
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
      type: ActTypes.MODIFIED_COLLECTION,
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
      type: ActTypes.REMOVED_COLLECTION,
      index: index,
    });
  },

  /**
   * Dispatch event to update collections
   * @param {array} collections - all collections
   */
  receivedCollections: function(collections, reset) {
    Dispatcher.dispatch({
      type: ActTypes.RECEIVED_COLLECTIONS,
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
      type: ActTypes.UPDATED_IDEAS,
      ideas: ideas,
    });
  },
};

module.exports = StormActions;
