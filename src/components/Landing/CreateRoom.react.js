const React = require('react');
const Modal = require('react-modal');
const CreateModal = require('./CreateModal.react');

const CreateRoom = React.createClass({
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
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2000,
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        overflow: 'hidden',
        width: '28%',
        height: '40%',
        border: '0',
        marginRight: '-50%',
        padding: '0',
        borderRadius: '3px',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <div className="createRoomButton">
        <a className="button" onClick={this.openModal}>Create a room</a>

        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <CreateModal error={this.props.message} close={this.closeModal} />
        </Modal>
      </div>
    );
  },
});

module.exports = CreateRoom;
