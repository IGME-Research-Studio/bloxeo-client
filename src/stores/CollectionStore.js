import { EventEmitter } from 'events';
import assign from 'object-assign';
import _ from 'lodash';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = {};
let layoutObjs = [];
const layoutSize = {
  width: 0,
};

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

  setCollectionSize: function(_key, width) {
    const d3Index = _.findIndex(layoutObjs, 'key', _key);
    layoutObjs[d3Index].width = width + 15;
  },

  updateCollection: (id) => _collections[id],
});

/**
 * Hide collections with the given ids
 * @param {number[]} ids - an array of ids to remove
 */
function hideCollections(ids) {
  for (let i = 0; i < ids.length; i++) {
    delete _collections[ids[i]];
  }
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
  return cont.map((idea) => {
    return { userId: idea.userId, text: idea.content, top: 0, left: 0 };
  });
}

/**
* Create an idea group when an idea is dragged to the workspace
*/
function createCollection(_key, cont) {
  const content = objectifyContent(cont);
  _collections[_key] = {content, votes: 0, key: _key};
}

/**
 * Recieve collections from server
 * @param {object[]} collections - all collections
 * @param {bool} reset - should old collection postion data be retained
 */
function receivedAllCollections(collections, reset) {
  let oldCollections = {};
  if (!reset) {
    oldCollections = JSON.parse(JSON.stringify(_collections));
  }
  // Clear out old collection data
  _collections = {};
  layoutObjs = [];
  CollectionStore.emitChange();
  // Create collections from server data
  let i = 0;
  for (const _key in collections) {
    if (_collections[_key] === undefined) {
      createCollection(_key, collections[_key].ideas);
      i++;
      // Retain old collection postion data
      const col = _collections[_key];
      if (oldCollections[_key]) {
        col.x = oldCollections[_key].x;
        col.y = oldCollections[_key].y;
        col.fixed = oldCollections[_key].fixed;
      }
      layoutObjs.push({key: _key, fixed: col.fixed, x: col.x, y: col.y});
    }
  }
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
}

function setLayoutSize(width) {
  layoutSize.width = width;
}

d.register(function({ type, payload }) {
  switch (type) {
  case actionTypes.HIDE_COLLECTIONS:
    hideCollections(payload);
    CollectionStore.emitChange();
    break;

  case actionTypes.MOVE_COLLECTION:
    moveCollection(payload.collectionId, payload.left, payload.top);
    CollectionStore.emitChange();
    break;

  case actionTypes.SET_LAYOUT_SIZE:
    setLayoutSize(payload.width, payload.height);
    break;

  case actionTypes.RECEIVED_COLLECTIONS:
    receivedAllCollections(payload.collections, payload.reset);
    CollectionStore.emitChange();
    break;

  case actionTypes.RETURN_RESULTS:
    returnResults(payload);
    CollectionStore.emitChange();
    break;

  default:
  }
});

module.exports = CollectionStore;
