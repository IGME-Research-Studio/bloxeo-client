import { EventEmitter } from 'events';
import assign from 'object-assign';
import { ify as lazy } from 'sloth';
import materialColors from 'material-color';
import { map, lensProp, set, pipe } from 'ramda';

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
  boardName: '',
  boardDesc: '',
  selectedTab: WORKSPACE_TAB,
  isOnWorkspace: true,
  users: [],
  userColorsEnabled: true,
  numResultsShown: 25,
  numResultsReturn: 5,
};

const self = assign({}, EventEmitter.prototype, {

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
      boardName: this.getRoomName(),
      boardDesc: this.getRoomDescription(),
    };
  },

  /*
   * @param {Array<Object>}
   * @return {Array<Object>>}
   */
  updateUsers: function(users, enabled) {
    const colors = enabled ? COLORS : ['#AAAAAA'];
    const headedUsers = moveToHeadByProp('userId', getUserId(), users);

    return pipe(
      (infinite, finite) => lazy(infinite).cycle().zip(finite).force(),
      map(([color, user]) => set(lensProp('color'), color, user)),
    )(colors, headedUsers);
  },

  updateBoardUsers: function(data) {
    return set(lensProp('users'),
               self.updateUsers(data.users, data.userColorsEnabled), data);
  },

  /**
   * @return {string}
   */
  getRoomName: function() {
    return boardOptions.boardName;
  },

  /**
   * @return {string}
   */
  getRoomDescription: function() {
    return boardOptions.boardDesc;
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
    boardOptions = self.updateBoardUsers({ ...boardOptions,
                                           ...action.updates });
    self.emitUpdate();
    break;

  case StormConstants.CHANGE_ROOM_NAME:
    boardOptions.boardName = action.roomName.trim();
    self.emitNameChange();
    break;

  case StormConstants.CHANGE_ROOM_DESCRIPTION:
    boardOptions.boardDesc = action.roomDesc.trim();
    self.emitNameChange();
    break;

  case StormConstants.SELECT_TAB:
    boardOptions.isOnWorkspace = action.isOnWorkspace;
    self.emitUpdate();
    break;

  default:
  }
});

module.exports = self;
