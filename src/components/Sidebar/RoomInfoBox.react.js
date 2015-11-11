const React = require('react');
const RoomName = require('./RoomName.react');
const RoomDesciption = require('./RoomDescription.react');

const RoomInfoBox = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sidebar-section">
        <RoomName name={this.props.room.name} />
        <RoomDesciption description={this.props.room.description} />
      </div>
    );
  },
});

module.exports = RoomInfoBox;
