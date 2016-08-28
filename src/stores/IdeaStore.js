import { EventEmitter } from 'events';
import assign from 'object-assign';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';
import io from '../io';
import { checkSocketStatus } from '../utils/checkStatus';

const IDEA_CHANGE_EVENT = 'idea';

let _ideas = [];

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
 * Set idea array on response from server
 * @param {array} ideas
 */
function setIdeas(ideas) {
  _ideas = ideas;
}

d.register(function({ type, payload }) {
  switch (type) {
  case actionTypes.UPDATED_IDEAS:
    setIdeas(payload.ideas);
    IdeaStore.emitChange();
    break;
  default:
  }
});

module.exports = IdeaStore;
