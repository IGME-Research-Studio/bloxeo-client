const React = require('react');
const classNames = require('classnames');
const StormActions = require('../../actions/StormActions');
const ModalHeader = require('../Modal/ModalHeader.react');
const ModalFooter = require('../Modal/ModalFooter.react');

const CreateModal = React.createClass({
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
    StormActions.createUser(this.state.name);
  },
  /**
   * @return {object}
   */
  render: function() {
    const hasError = classNames('hasError', {hide: !this.props.error});
    const placeholder = this.state.name ? this.state.name : `What's your name?`;
    return (
      <div className="joinModal">
        <ModalHeader title="User Options" close={this.props.close} />
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
        </div>
        <ModalFooter buttonText="Create Room" click={this._onSubmit} />
      </div>
    );
  },
});

module.exports = CreateModal;
