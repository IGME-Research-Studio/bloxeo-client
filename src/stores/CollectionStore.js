const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = [];

const CollectionStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getAllCollections: function() {
    return _collections;
  },

  updateCollection: function(id) {
    return _collections[id];
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
* Create an idea group when an idea is dragged from the idea bank onto the workspace
*/
function createCollection(idea, left, top) {
  const content = [idea.content];
  _collections.push({content, keep: true, left: left, top: top});
}
/**
* Group two ideas when one idea is dragged onto another
* Remove the ideaGroup that was combined with a second ideaGroup
*/
function groupIdeas(id, idea) {
  _collections[id].content.push(idea.content);
}
/**
 * Remove idea collection at specified index
 */
function removeCollection(id) {
  _collections.splice(id, 1);
}
/**
 * Set specified collection's position
 */
function moveCollection(id, left, top) {
  _collections[id].left = left;
  _collections[id].top = top;
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.COLLECTION_CREATE:
    createCollection(action.idea, action.left, action.top);
    CollectionStore.emitChange();
    break;
  case StormConstants.GROUP_IDEAS:
    groupIdeas(action.id, action.idea);
    CollectionStore.emitChange();
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    CollectionStore.emitChange();
    break;
  case StormConstants.REMOVE_COLLECTION:
    removeCollection(action.id);
    CollectionStore.emitChange();
    break;
  case StormConstants.MOVE_COLLECTION:
    moveCollection(action.id, action.left, action.top);
    CollectionStore.emitChange();
    break;
  }
});

module.exports = CollectionStore;
