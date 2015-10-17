const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const MEMBER_CHANGE_EVENT = 'member';
const NAME_CHANGE_EVENT = 'name';

let _boardName = 'Board Name';
const _members = [1, 2];

const BoardOptionsStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getAllMembers: function() {
    return _members;
  },
  /**
   * @return {string}
   */
  getRoomName: function() {
    return _boardName;
  },

  emitNameChange: function() {
    this.emit(NAME_CHANGE_EVENT);
  },

  emitMemberChange: function() {
    this.emit(MEMBER_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addNameListener: function(callback) {
    this.on(NAME_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeNameListener: function(callback) {
    this.removeListener(NAME_CHANGE_EVENT, callback);
  },
  addMemberListener: function(callback) {
    this.on(MEMBER_CHANGE_EVENT, callback);
  },
  removeMemberListener: function(callback) {
    this.removeListener(MEMBER_CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_NAME:
    _boardName = action.roomName.trim();
    BoardOptionsStore.emitNameChange();
    break;
  }
});

module.exports = BoardOptionsStore;
