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
  ideaGroupCreate: function(workspace) {
    console.log("it should be here");
    console.log(workspace);
    AppDispatcher.dispatch({
      actionType: StormConstants.IDEA_GROUP_CREATE,
      workspace: workspace
    });
  }, 
  storeGroupedIdea: function(idea) {
    AppDispatcher.dispatch({
      actionType: StormConstants.STORE_MOVED_IDEA, 
      idea: idea
    });
  }, 
  groupIdea: function(ideaGroup) {
    console.log("idea group in actions");
    AppDispatcher.dispatch({
      actionType: StormConstants.GROUP_IDEAS,
      ideaGroup: ideaGroup
    });
  }
};

module.exports = StormActions;
