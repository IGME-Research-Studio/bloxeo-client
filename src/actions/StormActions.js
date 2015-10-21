const AppDispatcher = require('../dispatcher/AppDispatcher');
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
  ideaGroupCreate: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_GROUP_CREATE,
    });
  },
  storeWorkspace: function(workspace) {
    AppDispatcher.dispatch({
      actionType: StormConstants.STORE_WORKSPACE,
      workspace: workspace,
    });
  },
  storeMovedIdea: function(idea) {
    AppDispatcher.dispatch({
      actionType: StormConstants.STORE_MOVED_IDEA,
      idea: idea,
    });
  },
  groupIdea: function(ideaGroup) {
    AppDispatcher.dispatch({
      actionType: StormConstants.GROUP_IDEAS,
      ideaGroup: ideaGroup,
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
};

module.exports = StormActions;
