/** Export Storm client constants */
module.exports = {
  CHANGE_ROOM_NAME: 'CHANGE_ROOM_NAME',
  CHANGE_ROOM_DESCRIPTION: 'CHANGE_ROOM_DESCRIPTION',
  // Timer constants
  TIMER_COUNTDOWN: 'TIMER_COUNTDOWN',
  TIMER_PAUSE: 'TIMER_PAUSE',
  TIMER_CHANGE: 'TIMER_CHANGE',
  // Idea constants
  IDEA_CREATE: 'IDEA_CREATE',
  // Collection Constants
  COLLECTION_CREATE: 'COLLECTION_CREATE',
  REMOVE_COLLECTION: 'REMOVE_COLLECTION',
  SEPARATE_IDEAS: 'SEPARATE_IDEAS',
  GROUP_IDEAS: 'GROUP_IDEAS',
  // Misc Constants
  MOVE_COLLECTION: 'MOVE_COLLECTION',
  SET_LAYOUT_SIZE: 'SET_LAYOUT_SIZE',
  STORE_RESULTS: 'STORE_RESULTS',
  RETURN_RESULTS: 'RETURN_RESULTS',
  SELECT_TAB: 'SELECT_TAB',
  HIDE_COLLECTIONS: 'HIDE_COLLECTIONS',
  STORE_WORKSPACE: 'STORE_WORKSPACE',
  STORE_MOVED_IDEA: 'STORE_MOVED_IDEA',
  // Server URL constants
  SERVER_URL_DEV: 'http://storm-server-fun.herokuapp.com',
  SERVER_URL_PROD: 'http://storm-server-prod.herokuapp.com',
  SERVER_URL_REVAMP: 'http://storm-server-fun.herokuapp.com',
  API_VERSION: '/v1',
  TEST_BOARD: '4yibJDO4l',
  // Server requests
  CREATE_BOARD: 'CREATE_BOARD',
  JOIN_BOARD: 'JOIN_BOARD',
  GET_IDEAS: 'GET_IDEAS',
  GET_COLLECTIONS: 'GET_COLLECTIONS',
  // Socket responses
  UPDATED_IDEAS: 'UPDATED_IDEAS',
  // Collection responses
  RECIEVED_COLLECTIONS: 'RECIEVED_COLLECTIONS',
  REMOVED_COLLECTION: 'REMOVED_COLLECTION',
  MODIFIED_COLLECTION: 'MODIFIED_COLLECTION',
  ADDED_COLLECTION: 'ADDED_COLLECTION',
  END_LOAD_ANIMATION: 'END_LOAD_ANIMATION',
  CUSTOM_MODAL_STYLES: {
    content: {
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      border: '0',
      borderRadius: '3px',
    },
    overlay: {
      backgroundColor: 'rgba(51, 51, 51, 0.6)',
      zIndex: '900',
    },
  },
};
