const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = [];
let lastMovedIdea = {};

const CollectionStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getAllCollections: function() {
    return _collections;
  },

  emitChange: function() {
    this.emit(COLLECTION_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addChangeListener: function(callback) {
    this.on(COLLECTION_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeChangeListener: function(callback) {
    this.removeListener(COLLECTION_CHANGE_EVENT, callback);
  },
});
/**
 * Hide ideas with the given ids
 * @param {string[]} ids - an array of ids to remove
 */
function _hideIdeas(ids) {
  for (let i = 0; i < ids.length; i++) {
    _collections[ids[i]].keep = false;
  }
  _collections = _collections.filter(function(group) {
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
function createCollection() {
  const content = [lastMovedIdea.state.idea.content[0]];

  // _ideaGroups.push([{content}]);
  _collections.push({content, keep: true});
}
/**
* Group two ideas when one idea is dragged onto another
* Remove the ideaGroup that was combined with a second ideaGroup
*/
function groupIdeas(collection) {
  const id = collection.state.ideaID;

  if (lastMovedIdea.state.ideas.content.length > 1) {
    return;
  }
  _collections[id].content.push(lastMovedIdea.state.ideas.content[0]);
  _collections.splice(lastMovedIdea.state.ideaID, 1);
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.COLLECTION_CREATE:
    createCollection();
    StormStore.emitChange();
    break;
  case StormConstants.STORE_MOVED_IDEA:
    storeMovedIdea(action.idea);
    break;
  case StormConstants.GROUP_IDEAS:
    groupIdeas(action.ideaGroup);
    StormStore.emitChange();
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    StormStore.emitChange();
    break;
  }
});

module.exports = CollectionStore;
