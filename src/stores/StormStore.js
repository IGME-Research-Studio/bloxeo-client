const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

const _ideas = [];
const _ideaGroups = [];
var lastMovedIdea = {};

/**
 * Create idea element and push to ideas array
 * @param {string} ideaContent
 */
function create(ideaContent) {
  const idea = {
    content: ideaContent,
    keep: true,
  };
  _ideas.push(idea);
}
function storeMovedIdea(idea) {
    lastMovedIdea = idea;
}

function createIdeaGroup(workspace) {
  _ideaGroups.push(lastMovedIdea.state.idea);
  workspace.setState({
    ideaGroups: _ideaGroups
  });
}

function groupIdeas(ideaGroup) {

  if(lastMovedIdea.state.ideas.length > 1) {
    return;
  }

  var updatedGroup = ideaGroup.state.ideas;
  updatedGroup.push(lastMovedIdea.state.ideas[0]);

  ideaGroup.setState({
    ideas: updatedGroup
  });
}

const StormStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of ideas
   * @return {array}
   */
  getAllIdeas: function() {
    return _ideas;
  },
  getAllGroups: function() {
    return _ideaGroups;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    break;
  case StormConstants.IDEA_GROUP_CREATE:
    createIdeaGroup(action.workspace);
    break;
  case StormConstants.STORE_MOVED_IDEA:
    storeMovedIdea(action.idea);
    break;
  case StormConstants.GROUP_IDEAS:
    groupIdeas(action.ideaGroup);
    break;
  }
});

module.exports = StormStore;
