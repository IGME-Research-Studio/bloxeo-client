import React from 'react';
import { TextField, Avatar } from 'material-ui';

import StormActions from '../../actions/StormActions';
import ModalFooter from './ModalFooter.react';
import UserStore from '../../stores/UserStore';
import { firstChar, isntNilorEmpty, isntEmptyValidator,
  updateValues, updateValuesWithError } from '../../utils/helpers';

const CreateForm = React.createClass({

  getInitialState: function() {
    return {
      values: {
        username: UserStore.getUserName(),
        boardName: '',
        boardDesc: '',
      },
      errors: {
        username: '',
      },
    };
  },

  /**
   * @param {object} event
   */
  _updateName: function({target: { value }}) {
    const errMsg = isntEmptyValidator('Username is required', value);

    this.setState(
      updateValuesWithError('username', value, errMsg, this.state)
    );
  },
  _updateBoardName: function({target: { value }}) {
    this.setState(updateValues('boardName', value, this.state));
  },
  _updateBoardDesc: function({target: { value }}) {
    this.setState(updateValues('boardDesc', value, this.state));
  },

  /**
   * Handle submit
   */
  _onSubmit: function() {
    if (isntNilorEmpty(this.state.values.username)) {
      const { username, boardName, boardDesc } = this.state.values;
      StormActions.createBoard({ username, boardName, boardDesc });
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    const firstLetter = firstChar(this.state.values.username);

    return (
      <div className="joinModal">
        <div className="modalContent">
          <TextField
            fullWidth
            hintText='Your username'
            value={this.state.values.username}
            errorText={this.state.errors.username}
            onChange={this._updateName}
          />

          <TextField
            fullWidth
            hintText='Project name (optional)'
            value={this.state.values.boardName}
            onChange={this._updateBoardName}
          />

          <TextField
            fullWidth
            multiLine
            rows={2}
            hintText={"Project description (optional)"}
            value={this.state.values.boardDesc}
            onChange={this._updateBoardDesc}
          />

          <div className="modalSection">
            <div className="modalUserText">Your user icon</div>

            <Avatar
              size={30}
              className='modalUserIcon'>

              {firstLetter}
            </Avatar>
          </div>

          <p className="modalTerms">
            Logging in confirms your agreement to <a href="#">our EULA</a>.
          </p>
        </div>

        <ModalFooter
          onSubmit={this._onSubmit}
          buttonText='Create room'
        />
      </div>
    );
  },
});

module.exports = CreateForm;
