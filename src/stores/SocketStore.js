const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const StormActions   = require('../actions/StormActions');
const socketIO       = require('socket.io-client');
const sailsIO        = require('sails.io.js');
// const reqwest        = require('reqwest');
// Init socket.io connection
const io = sailsIO(socketIO);
io.sails.url = StormConstants.SERVER_URL_DEV;

io.socket.get('/', function(body, JWR) {
  console.log('const', body, JWR); // ??? wut
  io.socket.on(SocketEvents.ADDED_COLLECTION, function(res) {
    console.log(res);
    // res = {
    //   index: in _collections array,
    //   content: ['strings', 'string'],
    // }
    StormActions.addedCollection(res.index, res.content);
  });

  io.socket.on(SocketEvents.MODIFIED_COLLECTION, function(res) {
    console.log(res);
    // res = {
    //   index: in _collections array,
    //   content: ['strings', 'string'],
    // }
    StormActions.modifiedCollection(res.index, res.content);
  });

  io.socket.on(SocketEvents.REMOVED_COLLECTION, function(res) {
    console.log(res);
    // res = {
    //   index: in _collections array,
    // }
    StormActions.removedCollection(res.index);
  });

  io.socket.on(SocketEvents.UPDATED_IDEAS, function(res) {
    console.log(res);
    // res = ['strings', 'string']
    StormActions.updatedIdeas(res);
  });

  io.socket.on(SocketEvents.RECIEVED_COLLECTIONS, function(res) {
    console.log(res);
    // res = []
    StormActions.recievedCollections(res);
  });
});

// EVENTS needed : ideaCreate, collectinCreate, groupIdeas, RemoveCollection, updateCollection
function getIdeas() {
  // Do get request
  console.log('GET IDEAS!');
}

function getCollections() {
  // Do get request
  console.log('GET COLLECTIONS!');
}

function addIdea(content) {
  // Do post request
  console.log('ADD IDEA!', content);
}

function addCollection(content, left, top) {
  // Do post request
  console.log('ADD COLLECTION!', content, left, top);
}

function removeCollection(id) {
  // Do post request
  console.log('REMOVE COLLECTION!', id);
}

function updateCollection(id, content) {
  // Do post request
  console.log('UPDATE COLLECTIONS!', id, content);
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case StormConstants.GET_IDEAS:
    getIdeas();
    break;
  case StormConstants.GET_COLLECTIONS:
    getCollections();
    break;
  case StormConstants.IDEA_CREATE:
    addIdea(action.ideaContent.trim());
    break;
  case StormConstants.GROUP_IDEAS:
    updateCollection(action.id, action.idea.content);
    break;
  case StormConstants.COLLECTION_CREATE:
    addCollection(action.idea.content, action.left, action.top);
    break;
  case StormConstants.REMOVE_COLLECTION:
    removeCollection(action.id);
    break;
  }
});
