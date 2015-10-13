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

const _ideas = [];
const _members = [1, 2];
let _ideaGroups = [
  {content: ['hello', 'world'], keep: true},
  {content: ['red', 'panda', 'blog'], keep: true},
  {content: ['flat', 'puzzle', 'game'], keep: true},
];

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
    create(action.ideaContent.trim());
    break;

  case StormConstants.DECREASE_TIME:
    StormStore.emit(CHANGE_EVENT);
    decrease();
    break;

  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    break;
  }
});

module.exports = StormStore;
