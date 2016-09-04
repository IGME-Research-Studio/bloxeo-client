import { map, fromPairs } from 'ramda';
import assign from 'object-assign';
import { EventEmitter } from 'events';

const UserStore = assign({}, EventEmitter.prototype, {

  /**
   * Get join error message
   * @return {array}
   */
  getErrorMessage: function() {
    return 'Username is undefined';
  },

  /**
   * Get server token
   */
  getUserToken: function() {
    return localStorage.getItem('UserToken');
  },

  getUserName: function() {
    return localStorage.getItem('UserName');
  },

  getUserId: function() {
    return localStorage.getItem('UserId');
  },

  clearUserData: function() {
    localStorage.clear();
  },

  /**
   * Set user data
   * @param {string} token - user token string from server
   * @param {string} name - user name from client
   */
  setUserData: function({token, username, userId}) {
    localStorage.setItem('UserToken', token);
    localStorage.setItem('UserName', username);
    localStorage.setItem('UserId', userId);
  },

  getUserData: function() {
    return fromPairs(
      map((k) => [k, localStorage.getItem(k)],
      ['UserToken', 'UserName', 'UserId']));
  },

  emitChange: function() {
    this.emit(ERROR_CHANGE_EVENT);
  },

  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addErrorListener: function(callback) {
    this.on(ERROR_CHANGE_EVENT, callback);
  },

  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeErrorListener: function(callback) {
    this.removeListener(ERROR_CHANGE_EVENT, callback);
  },
});

module.exports = UserStore;
