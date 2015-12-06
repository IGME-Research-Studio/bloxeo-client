const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const StormActions   = require('../actions/StormActions');
const socketIO       = require('socket.io-client');
const _              = require('lodash');
const reqwest        = require('reqwest');
const Promise        = require('bluebird');
// Init socket.io connection
const socket = socketIO.connect(StormConstants.SERVER_URL_DEV);
let currentBoardId = 0;
let notReceived = true;
let notReceivedBank = true;

const JOIN_CHANGE_EVENT = 'join';
let _joinError = '';

let errorMsg = '';
const ERROR_CHANGE_EVENT = 'JOIN_ERROR';
const SocketStore = assign({}, EventEmitter.prototype, {
  /**
   * Get join error message
   * @return {array}
   */
  getErrorMessage: function() {
    return errorMsg;
  },

  emitChange: function() {
    this.emit(ERROR_CHANGE_EVENT);
  },
  /**
   * Add a change listener
   * @param {function} callback - event callback function
   */
  addErrorListener: function(callback) {
    this.on(ERROR_CHANGE_EVENT, callback);
  },
  /**
   * Remove a change listener
   * @param {function} callback - callback to be removed
   */
  removeErrorListener: function(callback) {
    this.removeListener(ERROR_CHANGE_EVENT, callback);
  },
});

/**
 * Checks a socket response for an error
 * @param {object} data: response data
 */
function resolveSocketResponse(data) {
  return new Promise((resolve, reject) => {
    if (!(data.code >= 400)) {
      resolve(data);
    } else {
      reject(new Error(data.message));
    }
  });
}

socket.on('connect', () => {
  socket.emit('GET_CONSTANTS');
});

socket.on('RECEIVED_CONSTANTS', (body) => {
  const { EVENT_API, REST_API } = body;
  /**
   * Checks to update the client to the server
   */
  // function updateClient() {
  //   socket.emit(EVENT_API.GET_IDEAS, {boardId: currentBoardId});
  //   socket.emit(EVENT_API.GET_COLLECTIONS, {boardId: currentBoardId});
  // }
  // window.setInterval(updateClient, 10000);

  // // turn REST_API into route templates
  const Routes = _.mapValues(REST_API, (route) => {
    return _.template(StormConstants.SERVER_URL_DEV + route[1]);
  });
  // Socket Handlers
  // Idea was added or removed from collection
  socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      StormActions.receivedCollections(
        _.omit(res.data, ['top', 'left']),
        false
      );
    })
    .catch((res) => {
      console.error(`Error updating collections: ${res}`);
    });
  });
  // Idea was added or removed
  socket.on(EVENT_API.UPDATED_IDEAS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      const ideas = res.data.map((idea) => {
        return idea.content;
      });
      StormActions.updatedIdeas(ideas);
    })
    .catch((res) => {
      console.error(`Error updating ideas: ${res}`);
    });
  });
  socket.on(EVENT_API.JOINED_ROOM, (data) => {
    resolveSocketResponse(data)
    .then(() => {
      socket.emit(EVENT_API.GET_IDEAS, {boardId: currentBoardId});
      socket.emit(EVENT_API.GET_COLLECTIONS, {boardId: currentBoardId});
      errorMsg = '';
      SocketStore.emitChange();
      // append the board id to the url upon joining a room if it is not already there
      if (window.location.hash.split('?')[0] !== '#/workSpace') {
        const newUrl = window.location.href.split('?')[0] + 'workSpace?roomId=' + currentBoardId;
        window.location.href = newUrl;
      }
    })
    .catch((res) => {
      console.error(`Error joining a room: ${res}`);
      errorMsg = res.message;
      SocketStore.emitChange();
    });
  });
  socket.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      if (notReceived) {
        StormActions.receivedCollections(res.data, notReceived);
        notReceived = false;
        if (!notReceivedBank && !notReceived) {
          StormActions.endLoadAnimation();
        }
      }
    })
    .catch((res) => {
      console.error(`Error receiving collections: ${res}`);
    });
  });
  socket.on(EVENT_API.RECEIVED_IDEAS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      const ideas = res.data.map((idea) => {
        return idea.content;
      });
      StormActions.updatedIdeas(ideas);
      notReceivedBank = false;
      if (!notReceivedBank && !notReceived) {
        StormActions.endLoadAnimation();
      }
    })
    .catch((res) => {
      console.error(`Error receiving ideas: ${res}`);
    });
  });
  // Request Functions
  // Initialize ideas an collections
  /**
   * Joins board of given id
   * @param {string} boardId
   */
  function joinBoard(boardId) {
    currentBoardId = boardId;
    socket.emit(EVENT_API.JOIN_ROOM, {boardId: currentBoardId});
  }
  /**
   * Create new board
   */
  function createBoard() {
    reqwest({
      url: Routes.createBoard(),
      method: REST_API.createBoard[0],
      success: (res) => {
        // set url
        joinBoard(res.boardId);
      },
    });
  }
  /**
   * Make post request to server for idea creation
   * @param {string} ideaContent
   */
  function addIdea(content) {
    socket.emit(
      EVENT_API.CREATE_IDEA,
      {
        boardId: currentBoardId,
        content: content,
      }
    );
  }
  /**
   * Creates a collection with the given idea
   * @param {string} collection content from first idea added to collection
   */
  function addCollection(content, left, top) {
    socket.emit(
      EVENT_API.CREATE_COLLECTION,
      {
        boardId: currentBoardId,
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
  function removeCollection(_key) {
    socket.emit(
      EVENT_API.DESTROY_COLLECTION,
      {
        boardId: currentBoardId,
        key: _key,
      }
    );
  }
  /**
   * Adds an idea to a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function addIdeaToCollection(_key, content) {
    socket.emit(
      EVENT_API.ADD_IDEA,
      {
        boardId: currentBoardId,
        key: _key,
        content: content,
      }
    );
  }
  /**
   * Removes an idea from a collection
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function removeIdeaFromCollection(_key, content) {
    socket.emit(
      EVENT_API.REMOVE_IDEA,
      {
        boardId: currentBoardId,
        content: content,
        key: _key,
      }
    );
  }

  // Set up action watchers
  AppDispatcher.register((action) => {
    switch (action.actionType) {
    case StormConstants.CREATE_BOARD:
      createBoard();
      break;
    case StormConstants.JOIN_BOARD:
      joinBoard(action.boardId);
      break;
    case StormConstants.GET_IDEAS:
      socket.emit(EVENT_API.GET_IDEAS, {boardId: currentBoardId });
      break;
    case StormConstants.GET_COLLECTIONS:
      socket.emit(EVENT_API.GET_COLLECTIONS, {boardId: currentBoardId });
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
  // if page is on the workspace, join the room on page load
  if (window.location.hash.split('?')[0] === '#/workSpace') {
    const roomid = window.location.hash.split('=')[1];
    joinBoard(roomid);
  }
});

module.exports = SocketStore;
