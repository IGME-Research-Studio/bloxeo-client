import React, { PropTypes }  from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';

import { firstChar } from '../utils/helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const Avatar = ({name}) => (
  <MaterialAvatar
    size={30}
    className='modalUserIcon'>

    {firstChar(name)}
  </MaterialAvatar>
);

Avatar.propTypes = propTypes;
export default Avatar;
