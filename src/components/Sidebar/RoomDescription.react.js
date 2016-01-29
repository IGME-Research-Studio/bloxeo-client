const React = require('react');
const StormActions = require('../../actions/StormActions');

const ENTER_KEY_CODE = 13;

const RoomDesciption = React.createClass({
  getInitialState: function() {
    return {
      description: this.props.description,
      value: this.props.description,
      isEditing: false,
    };
  },
  componentDidUpdate: function() {
    if (this.state.isEditing) {
      document.getElementsByClassName('room-description')[0].focus();
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
   * Handle save and update room description
   */
  _onSave: function() {
    if (!this.state.value) {
      this.setState({
        value: this.state.description,
        isEditing: false,
      });
      return;
    } else {
      // save room description to StormStore
      StormActions.changeRoomDescription(this.state.value);
      // update room description view
      this.setState({
        description: this.state.value,
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
        <textarea
          className="roomInfoInput room-description"
          defaultValue={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          onBlur={this._onSave}>
        </textarea>
      );
    } else {
      return (
        <div
          className="room-description"
          onDoubleClick={this._onDoubleClick}>
          {this.state.description}
        </div>
      );
    }
  },
});

module.exports = RoomDesciption;
