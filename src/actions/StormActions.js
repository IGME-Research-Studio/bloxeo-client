const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');


const StormActions = {
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
  decrease: function() {
    AppDispatcher.dispatch({
      actionType: StormConstants.DECREASE_TIME,
    });
  },
};

module.exports = StormActions;
