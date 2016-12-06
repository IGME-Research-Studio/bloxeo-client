import React, { PropTypes }  from 'react';
import { TextField } from 'material-ui';
import { ifElse, isEmpty, always, all, values, compose } from 'ramda';

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

class JoinForm extends React.Component {
  state = {
    values: {
      username: UserStore.getUserName(),
      boardId: '',
    },
    errors: {
      username: '',
      boardId: '',
    },
  };

  componentDidMount() {
    this.setState({values: {username: this.state.values.username, boardId: this.props.boardId} });
  }

  _updateName = ({target: { value }}) => {
    this._validator('username', 'Username is required', value);
  };

  _updateCode = ({target: { value }}) => {
    this._validator('boardId', 'Room code is required', value);
  };

  _validator = (property, errMsg, value) => (
    updateValuesWithError(property, value, isntEmptyValidator(errMsg, value))
  );

  /**
   * Handle submit
   */
  _onSubmit = () => {
    if (all(isntNilorEmpty, values(this.state.values))) {
      const { boardId, username } = this.state.values;
      d.dispatch(validateBoard({ boardId, username }));
    }
    else {
      this.setState(compose(
        this._validator('boardId', 'Room code is required', this.state.values.boardId),
        this._validator('username', 'Username is required', this.state.values.username)
      )(this.state));
    }
  };

  /**
   * @return {object}
   */
  render() {
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
  }
}

JoinForm.propTypes = propTypes;
module.exports = JoinForm;
