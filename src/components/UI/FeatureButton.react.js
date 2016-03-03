import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';

const propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

const defaultProps = {
  fullWidth: true,
  primary: false,
  secondary: false,
};

const buttonStyle = {
  textAlign: 'center',
};
const labelStyle = {
  textTransform: 'none',
};

const FeatureButton = ({url, label, primary, secondary, fullWidth}) => (
  <RaisedButton
    linkButton
    disableTouchRipple
    primary={primary}
    secondary={secondary}
    fullWidth={fullWidth}
    style={buttonStyle}
    labelStyle={labelStyle}
    label={label}
    containerElement={<Link to={url} />}
  />
);

FeatureButton.defaultProps = defaultProps;
FeatureButton.propTypes = propTypes;
export default FeatureButton;
