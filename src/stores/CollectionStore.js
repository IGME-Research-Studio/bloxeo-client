const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const EventEmitter   = require('events').EventEmitter;
const assign         = require('object-assign');
const d3             = require('d3');
const _              = require('lodash');

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = {};
let layoutObjs = [];

// D3 force layout stuff
const force = d3.layout.force()
  .nodes(layoutObjs)
  .charge(-100)
  .gravity(0.1)
  .friction(0.6);

const CollectionStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getAllCollections: function() {
    return _collections;
  },

  getD3Data: function() {
    return layoutObjs;
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
  force.nodes(layoutObjs).start();
}
/**
 * Hide collections with the given ids
 * @param {number[]} ids - an array of ids to remove
 */
function hideCollections(ids) {
  _collections = _collections.filter(function(group) {
    if (ids.indexOf(group.index) === -1) {
      return true;
    }
    return false;
  });
}
/**
 * Create new collections for the given results
 * @param {object[]} results - given results
 */
function returnResults(results) {
  for (let i = 0; i < results.length; i++) {
    _collections.push({
      content: results[i].content,
      votes: 0,
      fixed: false,
      px: 0,
      py: 0,
      weight: 0,
      x: 100,
      y: 100,
    });
  }
}
/**
* Mutate content strings to a more usable object
* @param {Object[]} content - an array of strings
*/
function objectifyContent(cont) {
  const content = cont.map(function(i) {
    const item = {text: i.content, top: 0, left: 0};
    return item;
  });
  return content;
}
/**
* Create an idea group when an idea is dragged to the workspace
*/
function createCollection(_key, cont, left, top) {
  const content = objectifyContent(cont);
  _collections[_key] = {content, x: left, y: top, votes: 0, key: _key};
}
/**
* Change the content of collection with given index
*/
function updateCollection(_key, cont) {
  const content = objectifyContent(cont);
  _collections[_key].content = content;
}
/**
 * Recieve collections from server
 * @param {object[]} collections - all collections
 */
function receivedAllCollections(collections, reset) {
  if (reset) {
    _collections = {};
  } else {
    _collections = _.pick(_collections, _.keys(collections));
  }
  layoutObjs = [];
  for (const _key in collections) {
    if (_collections[_key] === undefined) {
      createCollection(_key, collections[_key].ideas, 100, 100);
      layoutObjs.push({key: _key, fixed: false, x: 100, y: 100});
    } else {
      const col = _collections[_key];
      updateCollection(_key, collections[_key].ideas);
      layoutObjs.push({key: _key, fixed: col.fixed, x: col.x, y: col.y});
    }
  }
}
/**
 * Remove idea collection at specified key
 */
function removeCollection(_key) {
  _collections = _omit(_collections, _key);
  updateForce();
}
/**
 * Set specified collection's position
 */
function moveCollection(_key, left, top) {
  const d3Index = _.findIndex(layoutObjs, 'key', _key);
  layoutObjs[d3Index].x = left;
  layoutObjs[d3Index].y = top;
  layoutObjs[d3Index].px = left;
  layoutObjs[d3Index].py = top;
  layoutObjs[d3Index].fixed = true;
  _collections[_key].fixed = true;
  updateForce();
}

function setLayoutSize(width, height) {
  force.size([width, height]);
}

// More d3
force.on('tick', function() {
  // console.log(layoutObjs);
  layoutObjs.forEach(function(n) {
    _collections[n.key].x = n.x;
    _collections[n.key].y = n.y;
  });
  CollectionStore.emitChange();
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.ADDED_COLLECTION:
    createCollection(action.index, action.content, action.left, action.top);
    CollectionStore.emitChange();
    updateForce();
    break;
  case StormConstants.MODIFIED_COLLECTION:
    updateCollection(action.index, action.content);
    CollectionStore.emitChange();
    updateForce();
    break;
  case StormConstants.HIDE_COLLECTIONS:
    hideCollections(action.ids);
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
  case StormConstants.SET_LAYOUT_SIZE:
    setLayoutSize(action.width, action.height);
    break;
  case StormConstants.RECEIVED_COLLECTIONS:
    receivedAllCollections(action.collections, action.reset);
    CollectionStore.emitChange();
    if (Object.keys(_collections).length > 0) {
      updateForce();
    }
    break;
  case StormConstants.RETURN_RESULTS:
    returnResults(action.results);
    CollectionStore.emitChange();
    break;
  default:
    break;
  }
});

module.exports = CollectionStore;
