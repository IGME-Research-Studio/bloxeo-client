import React, { PropTypes }  from 'react';
import classNames from 'classnames';
import { defaultTo } from 'ramda';

import StormActions from '../../actions/StormActions';
import ModalFooter from '../Modal/ModalFooter.react';

const propTypes = {
  boardId: PropTypes.string,
  error: PropTypes.string,
};

const stateOrProp = (subState, subProp) => defaultTo(subProp)(subState);

const JoinForm = React.createClass({
  getInitialState: function() {
    return {
      name: localStorage.getItem('UserName') || '',
    };
  },

  /**
   * @param {object} event
   */
  _updateName: function(event) {
    this.setState({
      name: event.target.value,
    });
  },

  /**
   * @param {object} event
   */
  _updateCode: function(event) {
    this.setState({
      boardId: event.target.value,
    });
  },

  /**
   * Handle submit
   */
  _onSubmit: function() {
    if (!this.state.name || this.state.boardId === '') {
      // @TODO This should display an error
      return;
    }
    StormActions.joinBoard(this.state.boardId, this.state.name);
  },

  /**
   * @return {object}
   */
  render: function() {
    const { error, boardId } = this.props;
    const hasError = classNames('hasError', {hide: !error});
    const placeholder = `What's your name?`;

    return (
      <div className="joinModal">
        <div className="modalContent">
          <div className="modalSection">
            <input
              type="text"
              className="modalInput"
              placeholder={placeholder}
              value={this.state.name}
              onChange={this._updateName}
            />
          </div>

          <div className="modalSection">
            <div className="modalUserText">Your user icon</div>
            <span className="modalUserIcon">?</span>
          </div>

          <div className="modalBreak"></div>
          <div className="modalSection">
            <span className={hasError} ref="error">{error}</span>
            <input
              type="text"
              className="modalInput"
              placeholder="Enter room code"
              value={stateOrProp(this.state.boardId, boardId)}
              onChange={this._updateCode}
            />
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
