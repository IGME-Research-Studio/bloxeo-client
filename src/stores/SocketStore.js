const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const StormActions   = require('../actions/StormActions');
const sailsIO        = require('sails.io.js');
const socketIO       = require('socket.io-client');
const _              = require('lodash');
// const reqwest        = require('reqwest');
// Init socket.io connection
const io = sailsIO(socketIO);
io.sails.url = StormConstants.SERVER_URL_DEV;

io.socket.get(StormConstants.API_VERSION + '/constants', (body) => {
  const { EVENT_API, REST_API } = body.data;
  // turn REST_API into route templates
  const Routes = _.mapValues(REST_API, (route) => {
    return _.template(route);
  });
  // Temp room join
  io.socket.post(Routes.joinRoom({boardId: StormConstants.TEST_BOARD }));

  io.socket.on(EVENT_API.ADDED_COLLECTION, (res) => {
    console.log(res);
    // res = {
    //   index: in _collections array,
    //   content: ['strings', 'string'],
    // }
    // StormActions.addedCollection(res.index, res.content);
  });

  io.socket.on(EVENT_API.MODIFIED_COLLECTION, (res) => {
    console.log(res);
    // res = {
    //   index: in _collections array,
    //   content: ['strings', 'string'],
    // }
    StormActions.modifiedCollection(res.index, res.content);
  });

  io.socket.on(EVENT_API.REMOVED_COLLECTION, (res) => {
    console.log(res);
    // res = {
    //   index: in _collections array,
    // }
    StormActions.removedCollection(res.index);
  });

  io.socket.on(EVENT_API.UPDATED_IDEAS, function(res) {
    console.log(res);
    // res = ['strings', 'string']
    // StormActions.updatedIdeas(res);
  });

  io.socket.on(EVENT_API.RECIEVED_COLLECTIONS, (res) => {
    console.log(res);
    // res = [{content:['word']}]
    StormActions.recievedCollections(res);
  });

  function getIdeas() {
    // Do get request
    console.log('GET IDEAS!');
    io.socket.get('route', {});
  }

  function getCollections() {
    // Do get request
    console.log('GET COLLECTIONS!');
    io.socket.get('route', {});
  }

  function addIdea(content) {
    // Do post request
    console.log('ADD IDEA!', content);
    io.socket.post(
      Routes.createIdea({boardId: StormConstants.TEST_BOARD }),
      {content: content}
    );
  }

  function addCollection(content, left, top) {
    // Do post request
    console.log('ADD COLLECTION!', content, left, top);
    io.socket.post('route', {});
  }

  function removeCollection(index) {
    // Do post request
    console.log('REMOVE COLLECTION!', index);
    io.socket.delete('route', {});
  }

  function updateCollection(id, content) {
    // Do post request
    console.log('UPDATE COLLECTIONS!', index, content);
    io.socket.put('route', {});
  }
  // Set up action watchers
  AppDispatcher.register((action) => {
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
});
