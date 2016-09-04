import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { green300, green500 } from 'material-ui/styles/colors';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const buttonStyle = {
  width: '100%',
  textAlign: 'center',
};
const labelStyle = {
  color: 'white',
};

const ModalFooter = ({onSubmit, buttonText}) => (
  <FlatButton
    disableTouchRipple
    backgroundColor={green500}
    hoverColor={green300}
    onTouchTap={onSubmit}
    style={buttonStyle}
    label={buttonText}
    labelStyle={labelStyle}
  />
);

ModalFooter.propTypes = propTypes;
export default ModalFooter;
