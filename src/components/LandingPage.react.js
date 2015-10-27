const React = require('react');
const CreateRoom = require('./CreateRoom.react');
const JoinRoom = require('./JoinRoom.react');

const LandingPage = React.createClass({
  render: function() {
    return (
      <div className="landingPage">
        <CreateRoom />
        <JoinRoom />
        {this.props.children}
      </div>
    );
  },
});

module.exports = LandingPage;
