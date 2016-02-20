import React, { PropTypes }  from 'react';
import Modal from 'react-modal';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'fixed',
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

const StatelessModal = ({onClose, children}) => (
  <Modal
    isOpen
    onRequestClose={onClose}
    style={customStyles}
  >
    {children}
  </Modal>
);

StatelessModal.propTypes = propTypes;
export default StatelessModal;
