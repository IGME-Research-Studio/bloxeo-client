import { createAction } from 'redux-actions';

import actionTypes from './constants/actionTypes';

export const createUser = createAction(actionTypes.CREATE_USER);

export const createBoard = createAction(actionTypes.CREATE_BOARD);
export const updateBoard = createAction(actionTypes.UPDATE_BOARD);
export const joinBoard = createAction(actionTypes.JOIN_BOARD);
export const validateBoard = createAction(actionTypes.VALIDATE_BOARD);
export const leaveBoard = createAction(actionTypes.LEAVE_BOARD);

export const endLoadAnimation = createAction(actionTypes.END_LOAD_ANIMATION);

export const changeRoomOptions = createAction(actionTypes.CHANGE_ROOM_OPTS);
export const changeRoomName = createAction(actionTypes.CHANGE_ROOM_NAME);
export const changeRoomDescription = createAction(actionTypes.CHANGE_ROOM_DESCRIPTION);

export const groupIdeas = createAction(actionTypes.GROUP_IDEA);
export const separateIdeas = createAction(actionTypes.SEPARATE_IDEAS);
export const createIdeas = createAction(actionTypes.CREATE_IDEA);
export const destroyIdeas = createAction(actionTypes.DESTROY_IDEA);
export const updatedIdeas = createAction(actionTypes.UPDATED_IDEAS);

export const hideCollections = createAction(actionTypes.HIDE_COLLECTIONS);
export const moveCollection = createAction(actionTypes.MOVE_COLLECTION);
export const removeCollection = createAction(actionTypes.REMOVE_COLLECTION);
export const createCollection = createAction(actionTypes.CREATE_COLLECTION);
export const addCollection = createAction(actionTypes.ADD_COLLECTION);
export const addedCollection = createAction(actionTypes.ADDED_COLLECTION);
export const modifiedCollection = createAction(actionTypes.MODIFIED_COLLECTION);
export const removedCollection = createAction(actionTypes.REMOVED_COLLECTION);
export const receivedCollections = createAction(actionTypes.RECEIVED_COLLECTIONS);

export const setLayoutSize = createAction(actionTypes.SET_LAYOUT_SIZE);

export const storeResults = createAction(actionTypes.STORE_RESULTS);
export const returnResults = createAction(actionTypes.RETURN_RESULTS);

// TODO remove in lieu of routing
export const toggleWorkspace = createAction(actionTypes.SELECT_TAB);
