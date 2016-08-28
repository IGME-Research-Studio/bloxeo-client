import { EventEmitter } from 'events';
import assign from 'object-assign';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

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

d.register(function({ type }) {
  switch (type) {
  case actionTypes.END_LOAD_ANIMATION:
    LoadingStore.emitChange();
    break;
  default:
  }
});

module.exports = LoadingStore;
