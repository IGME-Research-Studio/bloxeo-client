const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');

const StormActions = {
  ideaCreate: function () {
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_CREATE,
    });
  },
}

module.exports = StormActions;
