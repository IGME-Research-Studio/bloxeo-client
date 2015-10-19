const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';
const GROUP_CHANGE_EVENT = 'group';

const _room = {
  name: 'Room Name',
  description: 'Welcome!',
};
// total time in the timer
const _time = {
  minutes: 0,
  seconds: 10,
};
let _timer = null;
// if timer is paused
let _timerStatus = false;
const _ideas = [];
let _ideaGroups = [];
let lastMovedIdea = {};
const _members = [1, 2];

const StormStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of ideas
   * @return {array}
   */
  getAllIdeas: function() {
    return _ideas;
  },
  getAllGroups: function() {
    return _ideaGroups;
  },
  /**
   * Get an array of all ideaGroups
   * @return {array}
   */
  getIdeaGroups: function() {
    return _ideaGroups;
  },
  updateIdeaGroup: function(id) {
    return _ideaGroups[id];
  },
  /**
   * Get the entire collection of room members
   * @return {array}
   */
  getAllMembers: function() {
    return _members;
  },
  /**
   * @return {object}
   */
  getRoomInfo: function() {
    return _room;
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

  emitGroupChange: function() {
    this.emit(GROUP_CHANGE_EVENT);
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
  addGroupListener: function(callback) {
    this.on(GROUP_CHANGE_EVENT, callback);
  },
  removeGroupListener: function(callback) {
    this.removeListener(GROUP_CHANGE_EVENT, callback);
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
* Store the last moved idea in the workspace
*/
function storeMovedIdea(idea) {
  lastMovedIdea = idea;
}
/**
* Create an idea group when an idea is dragged from the idea bank onto the workspace
*/
function createIdeaGroup() {
  const content = [lastMovedIdea.state.idea.content[0]];
  _ideaGroups.push({content, keep: true});
}
/**
* Group two ideas when one idea is dragged onto another
* Remove the ideaGroup that was combined with a second ideaGroup
*/
function groupIdeas(ideaGroup) {
  const id = ideaGroup.state.ideaID;

  if (lastMovedIdea.state.ideas.content.length > 1) {
    return;
  }

  _ideaGroups[id].content.push(lastMovedIdea.state.ideas.content[0]);
  _ideaGroups.splice(lastMovedIdea.state.ideaID, 1);
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_NAME:
    _room.name = action.roomName.trim();
    StormStore.emitChange();
    break;
  case StormConstants.CHANGE_ROOM_DESCRIPTION:
    _room.description = action.roomDesc.trim();
    StormStore.emitChange();
    break;
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    StormStore.emitChange();
    StormStore.emit(GROUP_CHANGE_EVENT);
    break;
  case StormConstants.TIMER_COUNTDOWN:
    countdown();
    break;
  case StormConstants.TIMER_PAUSE:
    pauseTimer(action.isPaused);
    StormStore.emitChange();
    break;
  case StormConstants.IDEA_GROUP_CREATE:
    createIdeaGroup();
    StormStore.emit(GROUP_CHANGE_EVENT);
    break;
  case StormConstants.STORE_MOVED_IDEA:
    storeMovedIdea(action.idea);
    break;
  case StormConstants.GROUP_IDEAS:
    groupIdeas(action.ideaGroup);
    StormStore.emit(GROUP_CHANGE_EVENT);
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    StormStore.emit(GROUP_CHANGE_EVENT);
    break;
  }
});

module.exports = StormStore;
