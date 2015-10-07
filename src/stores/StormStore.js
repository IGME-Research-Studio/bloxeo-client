const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';

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
 * Create idea element
 */
function create() {
  // Push an idea to array
}

const StormStore = assign({}, EventEmitter.prototype, {
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
  getTime: function() {
    return ( _timer );
  },
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.IDEA_CREATE:
    create();
    break;
  case StormConstants.DECREASE_TIME:
    StormStore.emit(CHANGE_EVENT);
    decrease();
    break;
  }
});

module.exports = StormStore;
