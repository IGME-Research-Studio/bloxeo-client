import { EventEmitter } from 'events';
import assign from 'object-assign';
import { has, set, lensProp, defaultTo, when, pipe, prop,
  addIndex, map, values, sortBy } from 'ramda';

import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

const COLLECTION_CHANGE_EVENT = 'COLLECTION_CHANGE_EVENT';

let _collections = [];
const layoutSize = {
  width: 0,
};

const CollectionStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire array of collections
   * @return {array}
   */
  getAllCollections: () => _collections,

  getCollection: (id) => _collections[id],

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
    });
  }
}

const mapWithIndex = addIndex(map);

// SortBy predicate that treats undefined as Infinity
// So that items without the given key will be placed at the end
const propIndexSorter = (key) => (obj) => defaultTo(Infinity, prop(key, obj));

const indexLens = lensProp('index');

// Like a groupby, but without constructing an array since it is 1-1 mapping
// [{key, index}, ...] => {key: {index, key}}
// const fromOrderedToObj = reduce((acc, val) => {
//   acc[val.key] = val;
//   return acc;
// }, {});

const updateIndices = pipe(
    // get an unordered array of values from object
    values,
    // sort those by the index key
    sortBy(propIndexSorter('index')),
    // updates all the indexes so that there are no gaps or nils
    // e.g. if the current indexes are [0, 2, 3] => [0, 1, 2]
    mapWithIndex((collection, i) => set(indexLens, i, collection))
);

/**
 * Receive collections from server
 * Converts: {[collectionId]: {content: [Ideas}, key} ->
 * [ { content: [Ideas], key, index } ]
 * while preserving previous, non persisted order
 * @param {object[]} collections - all collections
 * @param {bool} reset - should old collection postion data be retained
 */
function receivedAllCollections(updatedCollections) {
  return updateIndices(
    map(when(
      (c) => has(c.key, _collections),
      (c) => set(indexLens, _collections[c.key].index, c)), updatedCollections));
}

/**
 * Set specified collection's position
 */
function moveCollection() {
  // deprecated
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
    moveCollection(payload.collectionId);
    CollectionStore.emitChange();
    break;

  case actionTypes.SET_LAYOUT_SIZE:
    setLayoutSize(payload.width, payload.height);
    break;

  case actionTypes.RECEIVED_COLLECTIONS:
    _collections = receivedAllCollections(payload.collections, payload.reset);
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
