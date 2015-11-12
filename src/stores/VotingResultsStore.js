const AppDispatcher  = require('../dispatcher/AppDispatcher');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');
const StormConstants = require('../constants/StormConstants');

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

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.STORE_RESULTS:
    _results = [];
    for (let i = 0; i < action.results.length; i++) {
      const result = action.results[i];
      _results.push({content: result.content.slice()});
    }
    VotingResultsStore.emitResultsChange();
    break;
  default:
    break;
  }
});

module.exports = VotingResultsStore;
