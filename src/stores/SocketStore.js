const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const StormActions   = require('../actions/StormActions');
const sailsIO        = require('sails.io.js');
const socketIO       = require('socket.io-client');
const _              = require('lodash');
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
  // io.socket.post(Routes.joinRoom({boardId: StormConstants.TEST_BOARD }));
  // Socket Handlers
  // Collection was created
  io.socket.on(EVENT_API.ADDED_COLLECTION, (res) => {
    StormActions.addedCollection(res.index, res.content);
  });
  // Idea was added or removed from collection
  io.socket.on(EVENT_API.MODIFIED_COLLECTION, (res) => {
    StormActions.modifiedCollection(res.index, res.content);
  });
  // Collection was deleted
  io.socket.on(EVENT_API.REMOVED_COLLECTION, (res) => {
    StormActions.removedCollection(res.index);
  });
  // Idea was added or removed
  io.socket.on(EVENT_API.UPDATED_IDEAS, function(res) {
    StormActions.updatedIdeas(res);
  });
  // Request Functions
  /**
   * Create new board
   */
  function createBoard() {
    io.socket.post(
      Routes.createBoard(),
      {isPublic: true},
      (res) => {
        console.log(res.data.boardId);
        io.socket.post(Routes.joinRoom({boardId: res.data.boardId}));
      }
    );
  }
  /**
   * Get all ideas on a board
   */
  function getIdeas() {
    io.socket.get(
      Routes.getIdeas({boardId: StormConstants.TEST_BOARD }),
      {},
      (res) => {
        StormActions.updatedIdeas(res.data);
      }
    );
  }
  /**
   * Get all collections on a board
   */
  function getCollections() {
    io.socket.get(
      Routes.getIdeaCollections({boardId: StormConstants.TEST_BOARD }),
      {},
      (res) => {
        StormActions.recievedCollections(res.data);
      }
    );
  }
  // Initialize ideas an collections
  getIdeas();
  getCollections();
  /**
   * Make post request to server for idea creation
   * @param {string} ideaContent
   */
  function addIdea(content) {
    io.socket.post(
      Routes.createIdea({boardId: StormConstants.TEST_BOARD }),
      {content: content}
    );
  }
  /**
   * Creates a collection with the given idea
   * @param {string} collection content from first idea added to collection
   */
  function addCollection(content, top, left) {
    io.socket.post(
      Routes.createIdeaCollection({boardId: StormConstants.TEST_BOARD}),
      {
        content: content,
        top: top,
        left: left,
      }
    );
  }
  /**
   * Remove collection of given index from board
   * @param {number} index
   */
  function removeCollection(index) {
    io.socket.delete(
      Routes.removeIdeaCollection({boardId: StormConstants.TEST_BOARD}),
      {index: index}
    );
  }
  /**
   * Adds an idea to a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function addIdeaToCollection(index, content) {
    io.socket.post(
      Routes.addIdeaToIdeaCollection({
        boardId: StormConstants.TEST_BOARD,
        index: index,
      }),
      {content: content}
    );
  }
  /**
   * Removes an idea from a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function removeIdeaFromCollection(index, content) {
    io.socket.delete(
      Routes.removeIdeaFromIdeaCollection({
        boardId: StormConstants.TEST_BOARD,
        index: index,
      }),
      {index: index, content: content}
    );
  }
  // Set up action watchers
  AppDispatcher.register((action) => {
    switch (action.actionType) {
    case StormConstants.CREATE_BOARD:
      createBoard();
      break;
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
      addIdeaToCollection(action.id, action.idea.content);
      break;
    case StormConstants.COLLECTION_CREATE:
      addCollection(action.idea.content, action.left, action.top);
      break;
    case StormConstants.REMOVE_COLLECTION:
      removeCollection(action.id);
      break;
    case StormConstants.SEPARATE_IDEAS:
      removeIdeaFromCollection(action.groupID, action.ideaContent);
      break;
    }
  });
});
