const React = require('react');
const classNames = require('classnames');
const StormActions = require('../../actions/StormActions');

const ENTER_KEY_CODE = 13;

const JoinModal = React.createClass({
  getInitialState: function() {
    return {
      value: '',
    };
  },
  /**
   * @param {object} event
   */
  _onChange: function(event) {
    this.setState({
      value: event.target.value,
    });
  },
  /**
   * @param {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onSubmit();
    }
  },
  /**
   * Handle submit and clear input box
   */
  _onSubmit: function() {
    if (this.state.value === '') {
      return;
    }
    StormActions.joinBoard(this.state.value);
  },
  /**
   * @return {object}
   */
  render: function() {
    const hasError = classNames('hasError', {hide: !this.props.error});
    return (
      <div className="joinModal">
        <input
          type="text"
          placeholder="Enter room code"
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
        <span className={hasError} ref="error">{this.props.error}</span>
      </div>
    );
  },
});

module.exports = JoinModal;
