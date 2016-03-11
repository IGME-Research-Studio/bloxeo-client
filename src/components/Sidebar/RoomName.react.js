const React = require('react');
const StormActions = require('../../actions/StormActions');

const ENTER_KEY_CODE = 13;

const RoomName = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name,
      value: this.props.name,
      isEditing: false,
    };
  },

  componentDidUpdate: function() {
    if (this.state.isEditing) {
      document.getElementsByClassName('room-name')[0].focus();
    }
  },

  /**
   * Enable editing mode on double click
   */
  _onDoubleClick: function() {
    this.setState({
      isEditing: true,
    });
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
   * Handle save and update room name
   */
  _onSave: function() {
    // check if room name is blank
    if (!this.state.value) {
      this.setState({
        value: this.state.name,
        isEditing: false,
      });
      return;
    }
    else {
      // save room name to StormStore
      StormActions.changeRoomName(this.state.value);
      // update room name view
      this.setState({
        name: this.state.value,
        isEditing: false,
      });
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    if (this.state.isEditing) {
      return (
        <input
          type="text"
          className="roomInfoInput room-name"
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          onBlur={this._onSave} />
      );
    }
    else {
      return (
        <h2
          className="noMargin room-name"
          onDoubleClick={this._onDoubleClick}>
          {this.state.name}
        </h2>
      );
    }
  },
});

module.exports = RoomName;
