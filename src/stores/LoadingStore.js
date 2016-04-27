const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const LOAD_CHANGE_EVENT = 'load';
const LoadingStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(LOAD_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addLoadingListener: function(callback) {
    this.on(LOAD_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeLoadingListener: function(callback) {
    this.removeListener(LOAD_CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch (action.type) {
  case StormConstants.END_LOAD_ANIMATION:
    LoadingStore.emitChange();
    break;
  default:
  }
});

module.exports = LoadingStore;
