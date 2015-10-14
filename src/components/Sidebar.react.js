const React = require('react');
const RoomName = require('./RoomName.react.js');
const MembersList = require('./MembersList.react');
const TimerBox = require('./TimerBox.react');

const Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sideBar">
        <RoomName room={this.props.roomName} />
        <MembersList />
        <TimerBox time={this.props.time} />
      </div>
    );
  },
});

module.exports = Sidebar;
