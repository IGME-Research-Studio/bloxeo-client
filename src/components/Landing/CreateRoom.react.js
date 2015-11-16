const React = require('react');
const Link  = require('react-router').Link;
const StormActions = require('../../actions/StormActions');

const CreateRoom = React.createClass({
  _onClick: function() {
    StormActions.createBoard();
  },
  render: function() {
    return (
      <div className="createRoomButton">
        <Link to="/workSpace" onClick={this._onClick} className="button">
          Create a room
        </Link>
      </div>
    );
  },
});

module.exports = CreateRoom;
