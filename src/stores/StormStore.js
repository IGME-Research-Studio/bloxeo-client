const AppDispatcher = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const CHANGE_EVENT = 'change';
const GROUP_CHANGE_EVENT = 'group';

let _roomName = 'Room Name';

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
let _ideaGroups = [];
let lastMovedIdea = {};
const _members = [1, 2];
/**
 * Create idea element and push to ideas array
 * @param {string} ideaContent
 */
function create(ideaContent) {
  const idea = {
    content: [ideaContent],
    keep: true,
  };
  _ideas.push(idea);
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
  // _ideaGroups.push([{content}]);
  _ideaGroups.push({content, keep:true});
  // _ideaGroups.push([lastMovedIdea.state.idea]);
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
  console.log(_ideaGroups);
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
  console.log("yes");
  console.log(_ideaGroups);
}

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

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.CHANGE_ROOM_NAME:
    _roomName = action.roomName.trim();
    break;
  case StormConstants.IDEA_CREATE:
    create(action.ideaContent.trim());
    StormStore.emit(GROUP_CHANGE_EVENT);
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
  case StormConstants.DECREASE_TIME:
    StormStore.emit(CHANGE_EVENT);
    decrease();
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    StormStore.emit(GROUP_CHANGE_EVENT);
    break;
  }
});

module.exports = StormStore;
