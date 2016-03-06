import React, { PropTypes } from 'react';
// import { RaisedButton } from 'material-ui';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const ModalFooter = ({onSubmit, buttonText}) => (
  <div className="modalFooter">
    <button
      className="modalButton"
      onClick={onSubmit}
    >
      {buttonText}
    </button>
  </div>
);

ModalFooter.propTypes = propTypes;
export default ModalFooter;
