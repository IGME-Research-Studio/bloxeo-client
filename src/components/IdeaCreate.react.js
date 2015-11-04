const React = require('react');
const StormActions = require('../actions/StormActions');

const ENTER_KEY_CODE = 13;

const IdeaCreate = React.createClass({
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
      this._onSave();
    }
  },
  /**
   * Handle submit and clear input box
   */
  _onSave: function() {
    if (this.state.value === '') {
      return;
    }
    StormActions.ideaCreate({text: this.state.value});
    this.setState({
      value: '',
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    if (this.props.timerStatus) {
      return (
        <input
          type="text"
          maxLength="30"
          className="idea-create"
          placeholder="Idea spew!"
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          disabled={true}
        />
      );
    }
    return (
      <input
        type="text"
        maxLength="30"
        className="idea-create"
        placeholder="Idea spew!"
        value={this.state.value}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        autoFocus={true}
      />
    );
  },
});

module.exports = IdeaCreate;
