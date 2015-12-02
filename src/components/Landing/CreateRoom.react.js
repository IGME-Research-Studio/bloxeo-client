const React = require('react');
const StormActions = require('../../actions/StormActions');


const CreateRoom = React.createClass({
  _onClick: function() {
    StormActions.createBoard();
    StormActions.getBoardId();
  },
  render: function() {
    return (
      <div className="createRoomButton">
        <div onClick={this._onClick} className="button">
          Create a room
        </div>
      </div>
    );
  },
});

module.exports = CreateRoom;
