import { EventEmitter } from 'events';
import assign from 'object-assign';
import { ify as lazy } from 'sloth';
import materialColors from 'material-color';
import { map, lensProp, set, pipe, find,
  propEq, prop, unless, isNil } from 'ramda';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';
import { gradientToDiscrete, moveToHeadByProp } from '../utils/helpers';
import { getUserId } from '../stores/UserStore';

const UPDATE_EVENT = 'UPDATE_EVENT';
const COLORS = gradientToDiscrete(materialColors['300']);

let boardOptions = {
  boardName: '',
  boardDesc: '',
  boardId: null,
  isOnWorkspace: true,
  users: [],
  userColorsEnabled: true,
  numResultsShown: 25,
  numResultsReturn: 5,
};

const getUser = (id) => find(propEq('userId', id))(boardOptions.users);

const self = assign({}, EventEmitter.prototype, {

  getBoardOptions: () => boardOptions,

  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getUsers: () =>  boardOptions.users,

  getUser: getUser,

  getBoardId: () => boardOptions.boardId,

  getRoomName: () => boardOptions.boardName,

  getRoomDescription: () => boardOptions.boardDesc,

  getColor: (userId) => unless(isNil, prop('color'))(getUser(userId)),

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
   * Returns the top number of voted ideaCollections that should be
   * automatically returned to the workspace.
   * @return {number}
   */
  getNumReturnToWorkspace: function() {
    return boardOptions.numResultsReturn;
  },

  emitUpdate: function() {
    this.emit(UPDATE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addUpdateListener: function(callback) {
    this.on(UPDATE_EVENT, callback);
  },

  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeUpdateListener: function(callback) {
    this.removeListener(UPDATE_EVENT, callback);
  },
});

d.register(function({ type, payload }) {
  switch (type) {
  case actionTypes.CHANGE_ROOM_OPTS:
    boardOptions = self.updateBoardUsers({ ...boardOptions,
                                           ...payload.updates });
    self.emitUpdate();
    break;

  default:
  }
});

module.exports = self;
