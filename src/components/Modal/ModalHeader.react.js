import React, { PropTypes }  from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const ModalHeader = ({onClose, title}) => (
  <div className="modalHeader">
    <div className="modalTitle">{title}</div>

    <span onClick={onClose}>
      <FontAwesome
        name="times"
        className="modalClose"
      />
    </span>
  </div>
);

ModalHeader.propTypes = propTypes;
export default ModalHeader;
