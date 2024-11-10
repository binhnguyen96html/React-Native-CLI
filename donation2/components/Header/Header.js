import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Header = ({
  title = '',
  type = 1,
  color = '#000000',
  numberOfLines = null,
}) => {
  const styleToApply = () => {
    switch (type) {
      case 1:
        return style.title1;
      case 2:
        return style.title2;
      case 3:
        return style.title3;
      default:
        return style.title1;
    }
  };

  return (
    <View>
      <Text
        style={[styleToApply(), color && {color: color}]}
        numberOfLines={numberOfLines ? numberOfLines : null}>
        {title}
      </Text>
    </View>
  );
};

//accidentally types default in the video, but should actually be defaultProps
// Header.defaultProps = {
//   title: '',
//   type: 1,
//   color: '#000000',
// };

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};

export default Header;
