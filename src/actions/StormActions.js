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
   * Dispatch idea create event
   * @param {string} ideaContent
   */
  ideaCreate: function(ideaContent) {
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_CREATE,
      ideaContent: ideaContent,
    });
  },
  decrease: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.DECREASE_TIME,
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
