const React = require('react');

const RoomName = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <h2>{this.props.room}</h2>
      </div>
    );
  },
});

module.exports = RoomName;
