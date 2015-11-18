const React = require('react');
const Modal = require('boron/FadeModal');
const JoinModal = require('./JoinModal.react');

const JoinRoom = React.createClass({
  _onClick: function() {
    this.refs.modal.show();
  },
  render: function() {
    return (
      <div className="joinRoomButton">
        <a className="button" onClick={this._onClick}>Join a room</a>

        <Modal ref="modal">
          <JoinModal error={this.props.message} />
        </Modal>
      </div>
    );
  },
});

module.exports = JoinRoom;
