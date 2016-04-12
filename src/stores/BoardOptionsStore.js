import { map, lensProp, set } from 'ramda';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import sloth from 'sloth';
import materialColors from 'material-color';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { WORKSPACE_TAB } from '../constants/NavBarConstants';
import StormConstants from '../constants/StormConstants';
import { gradientToDiscrete, moveToHeadByProp } from '../utils/helpers';
import { getUserId } from '../stores/UserStore';

const MEMBER_CHANGE_EVENT = 'MEMBER_CHANGE_EVENT';
const NAME_CHANGE_EVENT = 'NAME_CHANGE_EVENT';
const TAB_CHANGE_EVENT = 'TAB_CHANGE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const COLORS = gradientToDiscrete(materialColors['300']);

let boardOptions = {
  name: '',
  description: '',
  selectedTab: WORKSPACE_TAB,
  isOnWorkspace: true,
  users: [],
  userColorsEnabled: true,
  numResultsShown: 25,
  numResultsReturn: 5,
};

const BoardOptionsStore = assign({}, EventEmitter.prototype, {

  getBoardOptions: () => boardOptions,

  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getUsers: function() {
    return boardOptions.users;
  },

  getRoomData: function() {
    return {
      name: this.getRoomName(),
      description: this.getRoomDescription(),
    };
  },

  /*
   * @param {Array<Object>}
   * @return {Array<Object>>}
   */
  updateUsers: function(users) {
    const colors = boardOptions.userColorsEnabled ? COLORS : ['DDD'];
    const headedUsers = moveToHeadByProp('userId', getUserId(), users);
    return map(([color, user]) =>
               set(lensProp('color'), color, user),
               sloth.ify(colors)
                 .cycle()
                 .zip(headedUsers).force()
              );
  },

  /**
   * @return {string}
   */
  getRoomName: function() {
    return boardOptions.name;
  },

  /**
   * @return {string}
   */
  getRoomDescription: function() {
    return boardOptions.description;
  },

  /**
   * Returns the top number of voted ideaCollections that should be
   * automatically returned to the workspace.
   * @return {number}
   */
  getNumReturnToWorkspace: function() {
    return boardOptions.numResultsReturn;
  },

  getIsOnWorkspace: function() {
    return boardOptions.isOnWorkspace;
  },

  emitUpdate: function() {
    this.emit(UPDATE_EVENT);
  },
  emitNameChange: function() {
    this.emit(NAME_CHANGE_EVENT);
  },
  emitMemberChange: function() {
    this.emit(MEMBER_CHANGE_EVENT);
  },
  emitTabChange: function() {
    this.emit(TAB_CHANGE_EVENT);
  },

  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addUpdateListener: function(callback) {
    this.on(UPDATE_EVENT, callback);
  },
  addNameListener: function(callback) {
    this.on(NAME_CHANGE_EVENT, callback);
  },
  addMemberListener: function(callback) {
    this.on(MEMBER_CHANGE_EVENT, callback);
  },
  addTabChangeListener: function(callback) {
    this.on(TAB_CHANGE_EVENT, callback);
  },

  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeNameListener: function(callback) {
    this.removeListener(NAME_CHANGE_EVENT, callback);
  },
  removeUpdateListener: function(callback) {
    this.removeListener(UPDATE_EVENT, callback);
  },
  removeMemberListener: function(callback) {
    this.removeListener(MEMBER_CHANGE_EVENT, callback);
  },
  removeTabChangeListener: function(callback) {
    this.removeListener(TAB_CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_OPTS:
    const updates = set(lensProp('users'),
                        BoardOptionsStore.updateUsers(action.updates.users),
                        action.updates);
    boardOptions = { ...boardOptions, ...updates };
    BoardOptionsStore.emitUpdate();
    break;

  case StormConstants.CHANGE_ROOM_NAME:
    boardOptions.name = action.roomName.trim();
    BoardOptionsStore.emitNameChange();
    break;

  case StormConstants.CHANGE_ROOM_DESCRIPTION:
    boardOptions.description = action.roomDesc.trim();
    BoardOptionsStore.emitNameChange();
    break;

  case StormConstants.SELECT_TAB:
    boardOptions.isOnWorkspace = action.isOnWorkspace;
    BoardOptionsStore.emitUpdate();
    break;

  default:
  }
});

module.exports = BoardOptionsStore;
