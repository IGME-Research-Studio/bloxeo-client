const React = require('react');
const RoomName = require('./RoomName.react.js');
const MembersList = require('./MembersList.react');
const TimerElement = require('./TimerElement.react');

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      roomName: this.props.roomName,
    };
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sideBar">
        <RoomName room={this.state.roomName} />
        <MembersList />
        <TimerElement />
      </div>
    );
  },
});

module.exports = Sidebar;
