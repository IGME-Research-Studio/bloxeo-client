const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');

const StormActions = {
  /**
   * Dispatch idea create event
   */
  ideaCreate: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_CREATE,
    });
  },
  decrease: function(time) {
    AppDispatcher.dispatch({
      actionType: StormConstants.DECREASE_TIME,
      time: time,
    });
  },
};

module.exports = StormActions;
