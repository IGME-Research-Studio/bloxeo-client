import React, { PropTypes }  from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';
import { head } from 'ramda';
import materialColors from 'material-color';
import { gradientToDiscrete } from '../utils/helpers';

import { firstChar } from '../utils/helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  color: head(gradientToDiscrete(materialColors['300'])),
};

const Avatar = ({name, color, key}) => (
  <MaterialAvatar
    size={30}
    className='modalUserIcon'
    backgroundColor={color}
    key={key}
    style={{marginLeft: '5px'}}
    title={name}
  >

    {firstChar(name)}
  </MaterialAvatar>
);

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
export default Avatar;
