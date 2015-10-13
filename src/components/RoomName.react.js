const React = require('react');
const StormActions = require('../actions/StormActions');

const ENTER_KEY_CODE = 13;

const RoomName = React.createClass({
  getInitialState: function() {
    return {
      roomName: this.props.room,
      value: this.props.room,
      isEditing: false,
    };
  },
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
    if (this.state.value === '') {
      this.setState({
        isEditing: false,
      });
      return;
    }
    // save room name to StormStore
    StormActions.changeRoomName(this.state.value);
    // update room name view
    this.setState({
      roomName: this.state.value,
      isEditing: false,
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    if (this.state.isEditing) {
      return (
        <div>
          <input type="text" value={this.state.value} onChange={this._onChange} onKeyDown={this._onKeyDown} />
        </div>
      );
    }
    return (
      <div>
        <h2 onDoubleClick={this._onDoubleClick}>{this.state.roomName}</h2>
      </div>
    );
  },
});

module.exports = RoomName;
