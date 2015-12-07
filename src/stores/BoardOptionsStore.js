const AppDispatcher  = require('../dispatcher/AppDispatcher');
const NavBarConstants = require('../constants/NavBarConstants');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const MEMBER_CHANGE_EVENT = 'member';
const NAME_CHANGE_EVENT = 'name';
const TAB_CHANGE_EVENT = 'tab';
const NUM_RETURN_TO_WORKSPACE = 3;

let _boardName = 'Project Title';
let _description = 'This is the description.';
let _selectedTab = NavBarConstants.WORKSPACE_TAB;
const _members = ['AZ', 'GH'];

const BoardOptionsStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getAllMembers: function() {
    return _members;
  },
  getRoomData: function() {
    return {
      name: this.getRoomName(),
      description: this.getRoomDescription(),
    };
  },
  /**
   * @return {string}
   */
  getRoomName: function() {
    return _boardName;
  },

  /**
   * @return {string}
   */
  getRoomDescription: function() {
    return _description;
  },

  /**
   * Returns the top number of voted ideaCollections that should be
   * automatically returned to the workspace.
   * @return {number}
   */
  getNumReturnToWorkspace: function() {
    return NUM_RETURN_TO_WORKSPACE;
  },

  /**
   * Get the selected tab
   * @return {array}
   */
  getSelectedTab: function() {
    return _selectedTab;
  },

  emitNameChange: function() {
    this.emit(NAME_CHANGE_EVENT);
  },

  emitMemberChange: function() {
    this.emit(MEMBER_CHANGE_EVENT);
  },

  /**
   * Emit Tab Change Event
   */
  emitTabChange: function() {
    this.emit(TAB_CHANGE_EVENT);
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
  /**
   * Add tab change listener
   * @param {function} callback - event callback function
   */
  addTabChangeListener: function(callback) {
    this.on(TAB_CHANGE_EVENT, callback);
  },
  /**
   * Remove tab change listener
   * @param {function} callback - callback to be removed
   */
  removeTabChangeListener: function(callback) {
    this.removeListener(TAB_CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_NAME:
    _boardName = action.roomName.trim();
    BoardOptionsStore.emitNameChange();
    break;
  case StormConstants.CHANGE_ROOM_DESCRIPTION:
    _description = action.roomDesc.trim();
    BoardOptionsStore.emitNameChange();
    break;
  case StormConstants.SELECT_TAB:
    _selectedTab = action.selectedTab;
    BoardOptionsStore.emitTabChange();
    break;
  default:z
    break;
  }
});

module.exports = BoardOptionsStore;
