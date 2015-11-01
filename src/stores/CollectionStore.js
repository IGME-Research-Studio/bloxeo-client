const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');
const d3             = require('d3');

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = [];

// D3 force layout stuff
const force = d3.layout.force()
  .nodes(_collections)
  .charge(-300)
  .start();

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
function updateForce() {
  force.nodes(_collections).start();
}
/**
 * Hide ideas with the given ids
 * @param {number[]} ids - an array of ids to remove
 */
function _hideIdeas(ids) {
  _collections = _collections.filter(function(group) {
    if (ids.indexOf(group.index) === -1) {
      return true;
    }
    return false;
  });
}
/**
 * Add given collections to the stored collections
 * @param {object[]} collections - given collections
 */
function _addCollections(collections) {
  Array.prototype.push.apply(_collections, collections);
}
/**
* Create an idea group when an idea is dragged from the idea bank onto the workspace
*/
function createCollection(index, content, left, top) {
  _collections[index] = {content, keep: true, x: left, y: top, votes: 0};
}
/**
* Change the content of collection with given index
*/
function updateCollection(index, content) {
  _collections[index].content = content;
}
/**
 * Recieve collections from server
 * @param {object[]} collections - all collections
 */
function recievedAllCollections(collections) {
  collections.forEach((collection, index) => {
    if (_collections[index] === undefined) {
      createCollection(index, collection.content, 0, 0);
    } else {
      updateCollection(index, collection.content);
    }
    // _collections[index].content = collection.content;
  });
}
/**
 * Remove idea collection at specified index
 */
function removeCollection(index) {
  _collections.splice(index, 1);
  updateForce();
}
/**
 * Set specified collection's position
 */
function moveCollection(id, left, top) {
  _collections[id].x = left;
  _collections[id].y = top;
  _collections[id].px = left;
  _collections[id].py = top;
  updateForce();
}
/**
 * Remove one idea from idea group when mouse is held for x seconds
 */
function separateIdeas(ideaID, groupID) {
  if (_collections[groupID].content.length > 1) {
    _collections[groupID].content.splice(ideaID, 1);
  }
  updateForce();
}

function setLayoutSize(width, height) {
  force.size([width, height]);
}

// More d3
force.on('tick', function() {
  CollectionStore.emitChange();
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.ADDED_COLLECTION:
    createCollection(action.index, action.content, 0, 0);
    CollectionStore.emitChange();
    updateForce();
    break;
  case StormConstants.MODIFIED_COLLECTION:
    updateCollection(action.index, action.content);
    CollectionStore.emitChange();
    updateForce();
    break;
  case StormConstants.HIDE_IDEAS:
    _hideIdeas(action.ids);
    CollectionStore.emitChange();
    break;
  case StormConstants.REMOVED_COLLECTION:
    removeCollection(action.index);
    CollectionStore.emitChange();
    break;
  case StormConstants.MOVE_COLLECTION:
    moveCollection(action.id, action.left, action.top);
    CollectionStore.emitChange();
    updateForce();
    break;
  case StormConstants.SEPARATE_IDEAS:
    separateIdeas(action.ideaID, action.groupID);
    CollectionStore.emitChange();
    break;
  case StormConstants.SET_LAYOUT_SIZE:
    setLayoutSize(action.width, action.height);
    break;
  case StormConstants.ADD_COllECTIONS:
    _addCollections(action.collections);
    CollectionStore.emitChange();
    break;
  case StormConstants.RECIEVED_COLLECTIONS:
    recievedAllCollections(action.collections);
    updateForce();
    CollectionStore.emitChange();
    break;
  default:
    break;
  }
});

module.exports = CollectionStore;
