const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

const _roomName = 'Room Name';
const _members = [1, 2];
const _ideas = [];
// total time in the timer
const _timer = {
  minutes: 2,
  seconds: 10,
};
// decreases the timer by 1 every second
const decrease = function() {
  _timer.seconds --;
  if (_timer.seconds <= -1) {
    _timer.minutes --;
    _timer.seconds = 59;
  }
  // add a 0 in front of the seconds number when it drops below 10
  if (_timer.seconds < 10) {
    _timer.seconds = '0' + _timer.seconds;
  }
};

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

const StormStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of ideas
   * @return {array}
   */
  getAllIdeas: function() {
    return _ideas;
  },
  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getAllMembers: function() {
    return _members;
  },
  getRoomName: function() {
    return _roomName;
  },
  getTime: function() {
    return ( _timer );
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

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    break;
  case StormConstants.DECREASE_TIME:
    StormStore.emit(CHANGE_EVENT);
    decrease();
    break;
  }
});

module.exports = StormStore;
