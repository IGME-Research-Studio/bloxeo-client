import { EventEmitter } from 'events';
import assign from 'object-assign';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

const RESULTS_CHANGE_EVENT = 'RESULTS_CHANGE_EVENT';

let _results = [];

const VotingResultsStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getResults: function() {
    return _results;
  },
  /**
   * Emit Results Change Event
   */
  emitResultsChange: function() {
    this.emit(RESULTS_CHANGE_EVENT);
  },
  /**
   * Add results change listener
   * @param {function} callback - event callback function
   */
  addResultsChangeListener: function(callback) {
    this.on(RESULTS_CHANGE_EVENT, callback);
  },
  /**
   * Remove tab change listener
   * @param {function} callback - callback to be removed
   */
  removeResultsChangeListener: function(callback) {
    this.removeListener(RESULTS_CHANGE_EVENT, callback);
  },
});

d.register(function({ type, payload }) {
  switch (type) {
  case actionTypes.STORE_RESULTS:
    _results = payload;
    VotingResultsStore.emitResultsChange();
    break;
  default:
  }
});

module.exports = VotingResultsStore;
