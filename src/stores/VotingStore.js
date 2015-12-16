const AppDispatcher  = require('../dispatcher/AppDispatcher');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');
const StormConstants = require('../constants/StormConstants');

const VOTE_IDEAS_CHANGE_EVENT = 'VOTE_IDEAS_CHANGE_EVENT';
const RESULTS_CHANGE_EVENT = 'RESULTS_CHANGE_EVENT';

let _voteItems = {};
let _results = [];

const VotingStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of vote items
   * @return {object} voteItems - an object containing vote items
   */
  getAllVoteItems: function() {
    return _voteItems;
  },
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getResults: function() {
    return _results;
  },
  /**
   * Emit Vote Ideas change event
   */
  emitVoteIdeasChange: function() {
    this.emit(VOTE_IDEAS_CHANGE_EVENT);
  },
  /**
   * Add vote ideas change listener
   * @param {function} callback - event callback function
   */
  addVoteIdeasChangeListener: function(callback) {
    this.on(VOTE_IDEAS_CHANGE_EVENT, callback);
  },
  /**
   * Remove vote ideas change listener
   * @param {function} callback - event callback function
   */
  removeVoteIdeasChangeListener: function(callback) {
    this.removeListener(VOTE_IDEAS_CHANGE_EVENT, callback);
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
      _results.push(result);
    }
    VotingStore.emitResultsChange();
    break;
  case StormConstants.STORE_RESULT:
    _results = action.results;
    VotingStore.emitResultsChange();
    break;
  case StormConstants.STORE_VOTE_ITEMS:
    _voteItems = action.voteItems;
    VotingStore.emitVoteIdeasChange();
    break;
  default:
    break;
  }
});

module.exports = VotingStore;
