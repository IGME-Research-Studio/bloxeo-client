const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');

const StormActions = {
  /**
   * Dispatch create new board event
   */
  createBoard: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.CREATE_BOARD,
    });
  },
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
  separateIdeas: function(groupID, ideaContent) {
    AppDispatcher.dispatch({
      actionType: StormConstants.SEPARATE_IDEAS,
      groupID: groupID,
      ideaContent: ideaContent,
    });
  },
  /**
   * Dispatch event to hide collections with the given ids
   * @param {number[]} ids - array of ids to hide
   */
  hideCollections: function(ids) {
    AppDispatcher.dispatch({
      actionType: StormConstants.HIDE_COLLECTIONS,
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
   * Dispatch event return results to the workspace
   * @param {object[]} results - voting results
   */
  returnResults: function(results) {
    AppDispatcher.dispatch({
      actionType: StormConstants.RETURN_RESULTS,
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
   * Dispatch event add idea collections
   * @param {object[]} collections - collections to add
   */
  addCollections: function(collections) {
    AppDispatcher.dispatch({
      actionType: StormConstants.ADD_COllECTIONS,
      collections: collections,
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
  // SOCKET ACTIONS
  // Collections
  /**
   * Dispatch event to add a collection
   * @param {number} index - position in collections array
   * @param {array} content - content of collection
   */
  addedCollection: function(index, content, left, top) {
    AppDispatcher.dispatch({
      actionType: StormConstants.ADDED_COLLECTION,
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
    AppDispatcher.dispatch({
      actionType: StormConstants.MODIFIED_COLLECTION,
      index: index,
      content: content,
    });
  },
  /**
   * Dispatch event to remove a collection
   * @param {number} index - position in collections array
   */
  removedCollection: function(index) {
    AppDispatcher.dispatch({
      actionType: StormConstants.REMOVED_COLLECTION,
      index: index,
    });
  },
  /**
   * Dispatch event to update collections
   * @param {array} collections - all collections
   */
  recievedCollections: function(collections) {
    AppDispatcher.dispatch({
      actionType: StormConstants.RECIEVED_COLLECTIONS,
      collections: collections,
    });
  },
  // IDEAS
  /**
   * Dispatch event to update ideas
   * @param {array} ideas - all ideas
   */
  updatedIdeas: function(ideas) {
    AppDispatcher.dispatch({
      actionType: StormConstants.UPDATED_IDEAS,
      ideas: ideas,
    });
  },
};

module.exports = StormActions;
