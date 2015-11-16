const React = require('react');
const Link  = require('react-router').Link;

const StormConstants = require('../../constants/StormConstants');
const StormActions   = require('../../actions/StormActions');

const JoinRoom = React.createClass({
  _onClick: function() {
    StormActions.joinBoard(StormConstants.TEST_BOARD);
  },
  render: function() {
    return (
      <div className="joinRoomButton">
          <Link to="/workSpace" onClick={this._onClick} className="button">
            Join a room
          </Link>
      </div>
    );
  },
});

module.exports = JoinRoom;
