import {StyleSheet} from 'react-native';
import {verticalScale} from './scaling';

const globalStyle = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
    padding: 40
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
});

export default globalStyle;