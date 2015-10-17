const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const IDEA_CHANGE_EVENT = 'idea';

const _ideas = [];

const IdeaStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of ideas
   * @return {array}
   */
  getAllIdeas: function() {
    return _ideas;
  },

  emitChange: function() {
    this.emit(IDEA_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addChangeListener: function(callback) {
    this.on(IDEA_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeChangeListener: function(callback) {
    this.removeListener(IDEA_CHANGE_EVENT, callback);
  },
});
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

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    IdeaStore.emitChange();
    break;
  }
});

module.exports = StormStore;
