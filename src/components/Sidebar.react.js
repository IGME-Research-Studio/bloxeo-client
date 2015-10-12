const React = require('react');
const RoomName = require('./RoomName.react.js');
const MembersList = require('./MembersList.react');
const TimerElement = require('../components/TimerElement.react');

const Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sideBar">
        <RoomName />
        <MembersList />
        <TimerElement />
      </div>
    );
  },
});

module.exports = Sidebar;
