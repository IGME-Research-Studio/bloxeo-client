import React, { PropTypes }  from 'react';
import { TextField } from 'material-ui';
import { ifElse, isEmpty, always, all, values } from 'ramda';

import { validateBoard } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';
import ModalFooter from '../Modal/ModalFooter';
import Avatar from '../Avatar';
import UserStore from '../../stores/UserStore';
import { isntNilorEmpty,
  isntEmptyValidator, updateValuesWithError } from '../../utils/helpers';

const propTypes = {
  boardId: PropTypes.string,
  error: PropTypes.string,
};

const ifEmptyDefault = (maybe, def) => (
  ifElse(isEmpty, always(def), always(maybe))(maybe)
);

const JoinForm = React.createClass({
  getInitialState: function() {
    return {
      values: {
        username: UserStore.getUserName(),
        boardId: '',
      },
      errors: {
        username: '',
        boardId: '',
      },
    };
  },

  _updateName: function({target: { value }}) {
    const errMsg = isntEmptyValidator('Username is required', value);

    this.setState(
      updateValuesWithError('username', value, errMsg, this.state)
    );
  },

  _updateCode: function({target: { value }}) {
    const errMsg = isntEmptyValidator('Room code is required', value);

    this.setState(
      updateValuesWithError('boardId', value, errMsg, this.state)
    );
  },

  /**
   * Handle submit
   */
  _onSubmit: function() {
    if (all(isntNilorEmpty, values(this.state.values))) {
     d.dispatch(
        validateBoard(this.state.values.boardId, this.state.values.username)
      );
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    const { boardId } = this.props;

    return (
      <div className="joinModal">
        <div className="modalContent">
          <TextField
            fullWidth
            hintText='Your username'
            value={this.state.values.username}
            errorText={this.state.errors.username}
            onChange={this._updateName}
            onBlur={this._updateName}
          />

          <TextField
            fullWidth
            hintText='Room code'
            value={ifEmptyDefault(this.state.values.boardId, boardId)}
            errorText={this.state.errors.boardId}
            onChange={this._updateCode}
            onBlur={this._updateCode}
          />

          <div className="modalSection">
            <div className="modalUserText">Your user icon</div>

            <Avatar name={this.state.values.username} />
          </div>

          <p className="modalTerms">
            Logging in confirms your agreement to <a href="#">our EULA</a>.
          </p>
        </div>

        <ModalFooter
          onSubmit={this._onSubmit}
          buttonText='Join room'
        />
      </div>
    );
  },
});

JoinForm.propTypes = propTypes;
module.exports = JoinForm;
