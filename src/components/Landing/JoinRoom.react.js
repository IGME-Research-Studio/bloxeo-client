const React = require('react');
const StormConstants = require('../../constants/StormConstants');
const StormActions   = require('../../actions/StormActions');

const JoinRoom = React.createClass({
  _onClick: function() {
    StormActions.joinBoard(StormConstants.TEST_BOARD);
  },
  render: function() {
    return (
      <div className="joinRoomButton">
          <div onClick={this._onClick} className="button">
            Join a room
          </div>
      </div>
    );
  },
});

module.exports = JoinRoom;
