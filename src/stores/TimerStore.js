const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const TIME_CHANGE_EVENT = 'time';

// total time in the timer
const _time = {
  minutes: 0,
  seconds: 30,
};
let _timer = null;
// if timer is paused
let _timerStatus = false;
const _totalTime = (_time.minutes * 60) + _time.seconds;

const TimerStore = assign({}, EventEmitter.prototype, {
  /**
   * @return {object}
   */
  getTime: function() {
    return _time;
  },
   /**
  * Calculate the width of the timer visual as a percentage
  */
  getTimerWidth: function() {
    const timeLeft = _totalTime - ((_time.minutes * 60) + _time.seconds);
    const timePassedPercent = (timeLeft / _totalTime) * 100;
    return timePassedPercent;
  },
  /**
   * @return {boolean}
   */
  getTimerStatus: function() {
    return _timerStatus;
  },

  emitTimeChange: function() {
    this.emit(TIME_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addChangeListener: function(callback) {
    this.on(TIME_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeChangeListener: function(callback) {
    this.removeListener(TIME_CHANGE_EVENT, callback);
  },
});

/**
 * Timer countdown by 1 every second
 */
function countdown() {
  _timer = setInterval(function() {
    if (_time.minutes <= 0 && _time.seconds <= 0) {
      clearInterval(_timer);
      _timerStatus = true;
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
    TimerStore.emitTimeChange();
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
  case StormConstants.TIMER_COUNTDOWN:
    countdown();
    break;
  case StormConstants.TIMER_PAUSE:
    pauseTimer(action.isPaused);
    TimerStore.emitTimeChange();
    break;
  }
});

module.exports = TimerStore;
