import React, { PropTypes }  from 'react';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const absolute = {
  position: 'absolute',
};

const ModalHeader = ({onClose, title}) => (
  <div className="modalHeader">
    <span className="modalTitle">{title}</span>

    <span className='modalClose'>
      <IconButton
        className='modalClose'
        style={absolute}
        onClick={onClose}
      >
        <NavigationClose />
      </IconButton>
    </span>
  </div>
);

ModalHeader.propTypes = propTypes;
export default ModalHeader;
