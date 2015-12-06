const React = require('react');
const Modal = require('react-modal');
const JoinModal = require('./JoinModal.react');

const JoinRoom = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
    };
  },
  openModal: function() {
    this.setState({ isOpen: true });
  },
  closeModal: function() {
    this.setState({ isOpen: false });
  },
  render: function() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <div className="joinRoom">
        <a className="button" onClick={this.openModal}>Join a room</a>

        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <JoinModal error={this.props.message} />
        </Modal>
      </div>
    );
  },
});

module.exports = JoinRoom;
