import React, { PropTypes } from 'react';
import classNames from 'classnames';

import StormActions from '../../actions/StormActions';
import ModalFooter from './ModalFooter.react';

const propTypes = {
  error: PropTypes.string,
};

const CreateForm = React.createClass({

  getInitialState: function() {
    const name = localStorage.getItem('UserName');
    return {
      name: name,
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
   * Handle submit
   */
  _onSubmit: function() {
    if (!this.state.name) {
      // This should display an error
      return;
    }
    StormActions.createBoard(this.state.name);
  },

  /**
   * @return {object}
   */
  render: function() {
    const hasError = classNames('hasError', {hide: !this.props.error});
    const placeholder = this.state.name || `What's your name?`;

    return (
      <div className="joinModal">
        <div className="modalContent">
          <div className="modalSection">
            <span className={hasError} ref="error">{this.props.error}</span>
            <input
              type="text"
              className="modalInput"
              placeholder={placeholder}
              value={this.state.name}
              onChange={this._updateName}
            />
          </div>
          <div className="modalSection">
            <div className="modalUserText">Your unique user icon</div>
            <span className="modalUserIcon">?</span>
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

CreateForm.propTypes = propTypes;
module.exports = CreateForm;
