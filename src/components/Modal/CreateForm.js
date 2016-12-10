import React from 'react';
import { TextField } from 'material-ui';
import { compose } from 'ramda';

import { createBoard } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';
import ModalFooter from './ModalFooter';
import Avatar from '../Avatar';
import UserStore from '../../stores/UserStore';
import { isntNilorEmpty, isntEmptyValidator,
  updateValues, updateValuesWithError } from '../../utils/helpers';

class CreateForm extends React.Component {
  state = {
    values: {
      username: UserStore.getUserName(),
      boardName: '',
      boardDesc: '',
    },
    errors: {
      username: '',
    },
  };

  /**
   * @param {object} event
   */
  _updateName = ({target: { value }}) => {
    this.setState(
      this._validator('username', 'Username is required', value)(this.state)
    );
  };

  _updateBoardName = ({target: { value }}) => {
    this.setState(updateValues('boardName', value, this.state));
  };

  _updateBoardDesc = ({target: { value }}) => {
    this.setState(updateValues('boardDesc', value, this.state));
  };

  _validator = (property, errMsg, value) => (
    updateValuesWithError(property, value, isntEmptyValidator(errMsg, value))
  );

  /**
   * Handle submit
   */
  _onSubmit = () => {
    if (isntNilorEmpty(this.state.values.username)) {
      const { username, boardName, boardDesc } = this.state.values;
      d.dispatch(createBoard({ username, boardName, boardDesc }));
    }
    else {
      this.setState(
        this._validator('username', 'Username is required', this.state.values.username)(this.state)
      );
    }
  };

  /**
   * @return {object}
   */
  render() {

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

        <Avatar name={this.state.values.username}/>
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
  }
}

module.exports = CreateForm;
