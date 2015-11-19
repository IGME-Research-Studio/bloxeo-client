const React = require('react');
const Link  = require('react-router').Link;
const StormActions = require('../../actions/StormActions');


const CreateRoom = React.createClass({
  _onClick: function() {
    StormActions.createBoard();
    StormActions.getBoardId();
  },
  render: function() {
    return (
      <div className="createRoomButton">
        <Link onClick={this._onClick} to="/" className="button">
          Create a room
        </Link>
      </div>
    );
  },
});

module.exports = CreateRoom;
