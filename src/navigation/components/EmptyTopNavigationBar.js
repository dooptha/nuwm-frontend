import React from 'react';
import {
  withStyles,
} from 'react-native-ui-kitten';
import SafeAreaView from './SafeAreaView';
import { getColorFromTheme } from '../../utils/themes';

const EmptyTopNavigationBar = ({ theme, themeBackgroundColor }) => (
  <SafeAreaView
    style={{ backgroundColor: getColorFromTheme(themeBackgroundColor, theme) }}
    forceInset={{ top: 'always', bottom: 'never' }}
  />
);

EmptyTopNavigationBar.defaultProps = {
  themeBackgroundColor: 'background-basic-color-1',
  theme: {},
};

export default withStyles(EmptyTopNavigationBar, () => ({}));
