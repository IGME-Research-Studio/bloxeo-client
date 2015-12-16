const AppDispatcher  = require('../dispatcher/AppDispatcher');
const StormConstants = require('../constants/StormConstants');
const StormActions   = require('../actions/StormActions');
const socketIO       = require('socket.io-client');
const _              = require('lodash');
const reqwest        = require('reqwest');
const Promise        = require('bluebird');
const assign         = require('object-assign');
const EventEmitter   = require('events').EventEmitter;
const UserStore      = require('./UserStore');
// Init socket.io connection
const socket = socketIO.connect(StormConstants.SERVER_URL_DEV);
let currentBoardId = 0;
let currentEventId = 0;
let notReceived = true;
let notReceivedBank = true;

let token = '';
let errorMsg = '';
const ERROR_CHANGE_EVENT = 'JOIN_ERROR';
const VALIDATE_ERROR = 'VALIDATE_ERROR';
const SocketStore = assign({}, EventEmitter.prototype, {
  valid: true,
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
  emitValidError: function() {
    this.emit(VALIDATE_ERROR);
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
  addValidateListener: function(callback) {
    this.on(VALIDATE_ERROR, callback);
    if (!this.valid) this.emit(VALIDATE_ERROR);
  },
  removeValidateListener: function(callback) {
    this.removeListener(VALIDATE_ERROR, callback);
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
      console.log(data);
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
  // turn REST_API into route templates
  const Routes = _.mapValues(REST_API, (route) => {
    return _.template(StormConstants.SERVER_URL_DEV + route[1]);
  });
  // Socket Handlers
  // Idea was added or removed from collection
  socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
    resolveSocketResponse(data)
    .then((res) => {
      StormActions.receivedCollections(
        _.omit(res.data, ['top', 'left', 'key']),
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
      const reqObj = {
        boardId: currentBoardId,
        userToken: token,
      };
      socket.emit(EVENT_API.GET_IDEAS, reqObj);
      socket.emit(EVENT_API.GET_COLLECTIONS, reqObj);
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

  socket.on(EVENT_API.STARTED_TIMER, (data) => {
    // get boardId, eventId
    resolveSocketResponse(data)
    .then((res) => {
      currentEventId = res.data.eventId;
      console.log(res);
    })
    .catch((res) => {
      console.error(`Error starting timer: ${res.message}`);
    });
  });
  socket.on(EVENT_API.DISABLED_TIMER, (data) => {
    // gets boardId, disabled bool (success)
    resolveSocketResponse(data)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.error(`Error disabling timer: ${res.message}`);
    });
  });
  socket.on(EVENT_API.TIMER_EXPIRED, (data) => {
    // gets boardId, state (Object)
    // state has createIdeas bool, createIdeaCollection bool, voting bool, results bool
    resolveSocketResponse(data)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.error(`Error expiring timer: ${res.message}`);
    });
  });
  socket.on(EVENT_API.RECEIVED_TIME, (data) => {
    // gets back boardId, timeLeftInMS
    // if timeLeftInMS = 0, Timer expired
    resolveSocketResponse(data)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.error(`Error expiring timer: ${res.message}`);
    });
  });

  // Request Functions
  /**
   * Creates a user
   * @param {string} name
   */
  function createUser(name) {
    return new Promise((resolve, reject) => {
      if (!UserStore.getUserToken()) {
        reqwest({
          url: Routes.createUser(),
          method: REST_API.createUser[0],
          data: { username: name },
          success: (res) => {
            // store user stuff
            UserStore.setUserData(res, name);
            token = res;
            resolve(res);
          },
          error: () => {
            reject(new Error('User Creation Failed'));
          },
        });
      } else {
        token = UserStore.getUserToken();
        resolve(token);
      }
    });
  }
  /**
   * Validates a user token
   */
  function validateUser() {
    return new Promise((resolve, reject) => {
      if (UserStore.getUserToken()) {
        reqwest({
          url: Routes.validateUser(),
          method: REST_API.validateUser[0],
          data: { userToken: UserStore.getUserToken()},
          success: () => {
            console.log(UserStore.getUserToken());
            token = UserStore.getUserToken();
            SocketStore.valid = true;
            resolve(true);
          },
          error: () => {
            UserStore.clearUserData();
            SocketStore.valid = false;
            reject(new Error('User did not validate'));
          },
        });
      } else {
        reject(new Error('No cached user data'));
      }
    });
  }
  /**
   * Joins board of given id
   * @param {string} boardId
   */
  function joinBoard(boardId) {
    notReceived = true;
    currentBoardId = boardId;
    socket.emit(
      EVENT_API.JOIN_ROOM,
      {
        boardId: currentBoardId,
        userToken: token,
      });
  }
  /**
   * Create new board
   */
  function createBoard() {
    reqwest({
      url: Routes.createBoard(),
      method: REST_API.createBoard[0],
      data: { userToken: token },
      success: (res) => {
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
        userToken: token,
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
        userToken: token,
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
        userToken: token,
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
        userToken: token,
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
        userToken: token,
        key: _key,
      }
    );
  }

  /**
   * Starts the timer
   * @param {number} timeMS : time in milliseconds
   * @param {string} content : idea content
   */
  function startTimer(timeMS) {
    socket.emit(
      EVENT_API.START_TIMER,
      {
        boardId: currentBoardId,
        timerLengthInMS: timeMS,
        userToken: 'blah',
      }
    );
  }

  /**
   * Disable the timer
   * @param {number} index : collection index
   * @param {string} content : idea content
   */
  function disableTimer() {
    socket.emit(
      EVENT_API.DISABLE_TIMER,
      {
        boardId: currentBoardId,
        eventId: currentEventId,
        userToken: 'blah',
      }
    );
  }

  /**
   * Get time left in timer
   */
  function getTimeLeft() {
    socket.emit(
      EVENT_API.GET_TIME,
      {
        boardId: currentBoardId,
        userToken: 'blah',
      }
    );
  }
>>>>>>> Stashed changes
  // Set up action watchers
  AppDispatcher.register((action) => {
    switch (action.actionType) {
    case StormConstants.CREATE_BOARD:
      createUser(action.userName)
      .then(() => { createBoard();});
      break;
    case StormConstants.JOIN_BOARD:
      createUser(action.userName)
      .then(() => { joinBoard(action.boardId);});
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
    case StormConstants.START_TIMER:
      startTimer(action.time);
      break;
    case StormConstants.DISABLE_TIMER:
      disableTimer();
      break;
    case StormConstants.GET_TIME_LEFT:
      getTimeLeft();
      break;
    }
  });
  validateUser()
  .then(() => {
    // if page is on the workspace, join the room on page load
    if (window.location.hash.split('?')[0] === '#/workSpace') {
      const roomid = window.location.hash.split('=')[1];
      joinBoard(roomid);
    }
  })
  .catch(() => { SocketStore.emitValidError();});
});

module.exports = SocketStore;
