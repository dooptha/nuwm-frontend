import React, { Component } from 'react';
import { SafeAreaView } from '../../core/navigation';
import {
  ThemeProvider,
  withStyles,
} from 'react-native-ui-kitten';
import {
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';

import { themes } from '../../core/themes';

class MenuComponent extends Component {
  render() {
    const { selectedIndex, themedStyle, onTabSelect } = this.props;

    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <ThemeProvider theme={{...this.props.theme, ...themes['App Theme']}}>
          <BottomNavigation
            appearance='noIndicator'
            selectedIndex={selectedIndex}
            onSelect={onTabSelect}>
            <BottomNavigationTab
              title='Timetable'
              // icon={LayoutIconOutline}
            />
            <BottomNavigationTab
              title='Chat'
              // icon={StarIconOutline}
            />
            <BottomNavigationTab
              title='Settings'
              // icon={ColorPaletteIconOutline}
            />
          </BottomNavigation>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export const Menu = withStyles(MenuComponent, (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
