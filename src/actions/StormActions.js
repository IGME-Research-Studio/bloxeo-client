const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');

const StormActions = {
  /**
   * Dispatch change room name event
   * @param {string} roomName
   */
  changeRoomName: function(roomName) {
    AppDispatcher.dispatch({
      actionType: StormConstants.CHANGE_ROOM_NAME,
      roomName: roomName,
    });
  },
  /**
   * Dispatch change room description event
   * @param {string} description
   */
  changeRoomDescription: function(roomDesc) {
    AppDispatcher.dispatch({
      actionType: StormConstants.CHANGE_ROOM_DESCRIPTION,
      roomDesc: roomDesc,
    });
  },
  /**
   * Dispatch idea create event
   * @param {string} ideaContent
   */
  ideaCreate: function(ideaContent) {
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_CREATE,
      ideaContent: ideaContent,
    });
  },
  /**
   * Dispatch timer countdown event
   */
  countdown: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.TIMER_COUNTDOWN,
    });
  },
  /**
   * Dispatch pause timer event
   * @param {boolean} pause
   */
  pauseTimer: function(isPaused) {
    AppDispatcher.dispatch({
      actionType: StormConstants.TIMER_PAUSE,
      isPaused: isPaused,
    });
  },
  collectionCreate: function(idea, left, top) {
    AppDispatcher.dispatch({
      actionType: StormConstants.COLLECTION_CREATE,
      idea: idea,
      left: left,
      top: top,
    });
  },
  storeWorkspace: function(workspace) {
    AppDispatcher.dispatch({
      actionType: StormConstants.STORE_WORKSPACE,
      workspace: workspace,
    });
  },
  groupIdea: function(id, idea) {
    AppDispatcher.dispatch({
      actionType: StormConstants.GROUP_IDEAS,
      idea: idea,
      id: id,
    });
  },
  separateIdeas: function(ideaID, groupID) {
    AppDispatcher.dispatch({
      actionType: StormConstants.SEPARATE_IDEAS,
      ideaID: ideaID,
      groupID: groupID,
    });
  },
  /**
   * Dispatch event to hide ideas with the given ids
   * @param {number[]} ids - array of ids to hide
   */
  hideIdeas: function(ids) {
    AppDispatcher.dispatch({
      actionType: StormConstants.HIDE_IDEAS,
      ids: ids,
    });
  },
  /**
   * Dispatch event to set voting results
   * @param {object[]} results - voting results
   */
  storeResults: function(results) {
    AppDispatcher.dispatch({
      actionType: StormConstants.STORE_RESULTS,
      results: results,
    });
  },
  /**
   * Dispatch event to select a tab
   */
  selectTab: function(tab) {
    AppDispatcher.dispatch({
      actionType: StormConstants.SELECT_TAB,
      selectedTab: tab,
    });
  },
  /**
   * Dispatch event to move a collection
   * @param {number} ids - collection to move
   * @param {number} left - collection new left
   * @param {number} right - collection new right
   */
  moveCollection: function(id, left, top) {
    AppDispatcher.dispatch({
      actionType: StormConstants.MOVE_COLLECTION,
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
    AppDispatcher.dispatch({
      actionType: StormConstants.REMOVE_COLLECTION,
      id: id,
    });
  },
  /**
   * Dispatch event to remove a collection with given id
   * @param {number} id - collection to remove
   */
  setLayoutSize: function(width, height) {
    AppDispatcher.dispatch({
      actionType: StormConstants.SET_LAYOUT_SIZE,
      width: width,
      height: height,
    });
  },
};

module.exports = StormActions;
