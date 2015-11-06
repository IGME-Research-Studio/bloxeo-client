const React = require('react');
// const Link  = require('react-router').Link;
const StormActions = require('../../actions/StormActions');

const CreateRoom = React.createClass({
  _onClick: function() {
    StormActions.createBoard();
    window.location = '/#/workSpace';
  },
  render: function() {
    return (
      <div className="createRoomButton">
        <a className="button" onClick={this._onClick}>Create a room</a>
      </div>
    );
  },
});

module.exports = CreateRoom;
