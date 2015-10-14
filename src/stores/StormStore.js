const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _roomName = 'Room Name';
const _members = [1, 2];
const _ideas = [];
// total time in the timer
const _time = {
  minutes: 0,
  seconds: 10,
};
let _timer = null;
// if timer is paused
let _timerStatus = false;
let _ideaGroups = [
  {content: ['hello', 'world'], keep: true},
  {content: ['red', 'panda', 'blog'], keep: true},
  {content: ['flat', 'puzzle', 'game'], keep: true},
];

const StormStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of ideas
   * @return {array}
   */
  getAllIdeas: function() {
    return _ideas;
  },
  /**
   * Get an array of all ideaGroups
   * @return {array}
   */
  getIdeaGroups: function() {
    return _ideaGroups;
  },
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
    return _roomName;
  },
  /**
   * @return {object}
   */
  getTime: function() {
    return _time;
  },
  /**
   * @return {boolean}
   */
  getTimerStatus: function() {
    return _timerStatus;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

/**
 * Create idea element and push to ideas array
 * @param {string} ideaContent
 */
function create(ideaContent) {
  const idea = {
    content: ideaContent,
    keep: true,
  };
  _ideas.push(idea);
}
/**
 * Hide ideas with the given ids
 * @param {string[]} ids - an array of ids to remove
 */
function _hideIdeas(ids) {
  for (let i = 0; i < ids.length; i++) {
    _ideaGroups[ids[i]].keep = false;
  }
  _ideaGroups = _ideaGroups.filter(function(group) {
    return group.keep ? true : false;
  });
}
/**
 * Timer countdown by 1 every second
 */
function countdown() {
  _timer = setInterval(function() {
    if (_time.minutes <= 0 && _time.seconds <= 0) {
      clearInterval(_timer);
      _timerStatus = isPaused;
    } else {
      _time.seconds --;
      if (_time.seconds <= -1) {
        _time.minutes --;
        _time.seconds = 59;
      }
      // add a 0 in front of the seconds number when it drops below 10
      if (_time.seconds < 10) {
        _time.seconds = '0' + _time.seconds;
      }
    }
    StormStore.emitChange();
  }, 1000);
}
/**
 * Pause timer and set timer status
 * @param {boolean} isPaused
 */
function pauseTimer(isPaused) {
  if (isPaused) {
    clearInterval(_timer);
    _timerStatus = isPaused;
  } else {
    _timerStatus = isPaused;
    countdown();
  }
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_NAME:
    _roomName = action.roomName.trim();
    StormStore.emitChange();
    break;
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    StormStore.emitChange();
    break;
  case StormConstants.TIMER_COUNTDOWN:
    countdown();
    break;
  case StormConstants.TIMER_PAUSE:
    pauseTimer(action.isPaused);
    StormStore.emitChange();
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    break;
  }
});

module.exports = StormStore;
