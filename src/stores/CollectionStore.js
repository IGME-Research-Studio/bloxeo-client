import { EventEmitter } from 'events';
import assign from 'object-assign';
import d3 from 'd3';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

const COLLECTION_CHANGE_EVENT = 'collection';

let _collections = {};
let layoutObjs = [];
const layoutSize = {
  width: 0,
  height: 0,
};

// D3 force layout stuff
const force = d3.layout.force()
  .nodes(layoutObjs)
  .charge(function(d, i) { return i ? -30 : -2000; })
  .gravity(0.05)
  .friction(0.01);

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

  setCollectionSize: function(_key, width, height) {
    const d3Index = _.findIndex(layoutObjs, 'key', _key);
    layoutObjs[d3Index].height = height + 15;
    layoutObjs[d3Index].width = width + 15;
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
* Change the content of collection with given index
*/
function updateCollection(_key, cont) {
  const content = objectifyContent(cont);
  _collections[_key].content = content;
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
  layoutSize.width = width;
  layoutSize.height = height;
}

// More d3
function collide(node) {
  return function(quad) {
    let updated = false;
    if (quad.point && (quad.point !== node)) {
      let dx = node.x - quad.point.x;
      let dy = node.y - quad.point.y;
      const xSpacing = (quad.point.width + node.width) / 2;
      const ySpacing = (quad.point.height + node.height) / 2;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      let l = 0;
      let lx = 0;
      let ly = 0;

      if (absX < xSpacing && absY < ySpacing) {
        l = Math.sqrt(dx * dx + dy * dy);

        lx = (absX - xSpacing) / l;
        ly = (absY - ySpacing) / l;

        // the one that's barely within the bounds probably triggered
        // the collision
        if (Math.abs(lx) > Math.abs(ly)) {
          lx = 0;
        }
        else {
          ly = 0;
        }

        node.x -= dx *= lx;
        node.y -= dy *= ly;
        quad.point.x += dx;
        quad.point.y += dy;

        updated = true;
      }
    }
    return updated;
  };
}

// tick
force.on('tick', function() {
  const q = d3.geom.quadtree(layoutObjs);
  let i = 0;
  const n = layoutObjs.length;

  while (++i < n) {
    q.visit(collide(layoutObjs[i]));
  }

  layoutObjs.forEach(function(obj) {
    _collections[obj.key].x = obj.x;
    _collections[obj.key].y = obj.y;
  });
  CollectionStore.emitChange();
});

AppDispatcher.register(function(action) {
  switch (action.type) {
  case actionTypes.ADDED_COLLECTION:
    createCollection(action.index,
                     action.content,
                     action.left,
                     action.top);
    CollectionStore.emitChange();
    updateForce();
    break;

  case actionTypes.MODIFIED_COLLECTION:
    updateCollection(action.index, action.content);
    CollectionStore.emitChange();
    updateForce();
    break;

  case actionTypes.HIDE_COLLECTIONS:
    hideCollections(action.ids);
    CollectionStore.emitChange();
    break;

  case actionTypes.REMOVED_COLLECTION:
    removeCollection(action.index);
    CollectionStore.emitChange();
    break;

  case actionTypes.MOVE_COLLECTION:
    moveCollection(action.id, action.left, action.top);
    CollectionStore.emitChange();
    updateForce();
    break;

  case actionTypes.SET_LAYOUT_SIZE:
    setLayoutSize(action.width, action.height);
    break;

  case actionTypes.RECEIVED_COLLECTIONS:
    receivedAllCollections(action.collections, action.reset);
    CollectionStore.emitChange();
    if (_.keys(_collections).length > 0) {
      updateForce();
    }
    break;

  case actionTypes.RETURN_RESULTS:
    returnResults(action.results);
    CollectionStore.emitChange();
    break;

  default:
  }
});

module.exports = CollectionStore;
