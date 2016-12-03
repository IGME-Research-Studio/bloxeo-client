import { EventEmitter } from 'events';
import assign from 'object-assign';
import d from '../dispatcher/AppDispatcher';
import actionTypes from '../constants/actionTypes';

let _error;

const ERROR_CHANGE_EVENT = 'error';

const ErrorStore = assign({}, EventEmitter.prototype, {
  addErrorListener(callback) {
    this.on(ERROR_CHANGE_EVENT, callback);
  },

  emitError() {
    this.emit(ERROR_CHANGE_EVENT, {error: _error, errorOpen: true });
  },

  removeErrorListener(callback) {
    this.removeListener(ERROR_CHANGE_EVENT, callback);
  },
});

function setError(error) {
  _error = error;
}

d.register(({ type, payload }) => {
  switch (type) {
  case actionTypes.SHOW_ERROR:
    setError(payload.error);
    ErrorStore.emitError();
    break;

  default:
  }
});

module.exports = ErrorStore;
