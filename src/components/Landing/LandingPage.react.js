const React = require('react');
const CreateRoom = require('./CreateRoom.react');
const JoinRoom = require('./JoinRoom.react');
const SocketStore = require('../../stores/SocketStore');

function getStates() {
  return {
    joinError: SocketStore.getErrorMessage(),
  };
}

const LandingPage = React.createClass({
  getInitialState: function() {
    return getStates();
  },

  componentDidMount: function() {
    SocketStore.addErrorListener(this._onChange);
  },

  componentWillUnmount: function() {
    SocketStore.removeErrorListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStates());
  },

  render: function() {
    return (
      <div className="landingPage">
        <CreateRoom />
        <JoinRoom message={this.state.joinError} />
      </div>
    );
  },
});

module.exports = LandingPage;
