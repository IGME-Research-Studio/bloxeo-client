const React = require('react');
const CreateRoom = require('./CreateRoom.react');
const JoinRoom = require('./JoinRoom.react');

const LandingPage = React.createClass({
  render: function() {
    return (
      <div className="landingPage">
        <CreateRoom />
        <JoinRoom />
      </div>
    );
  },
});

module.exports = LandingPage;
