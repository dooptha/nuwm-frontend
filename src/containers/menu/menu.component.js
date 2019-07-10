import React, { Component } from 'react';
import {
  ThemeProvider,
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import { SafeAreaView } from '../../core/navigation';

import themes from '../../utils/themes';
import {
  GridIconOutline,
  LayoutIconOutline,
  MessageCircleIcon,
} from '../../assets/icons';
import I18n from '../../core/localization';

class MenuComponent extends Component {
  render() {
    const { selectedIndex, themedStyle, onTabSelect } = this.props;

    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <ThemeProvider theme={{ ...this.props.theme, ...themes['App Theme'] }}>
          <BottomNavigation
            appearance="noIndicator"
            selectedIndex={selectedIndex}
            onSelect={onTabSelect}
          >
            <BottomNavigationTab
              title={I18n.t('tabs.timetable')}
              icon={LayoutIconOutline}
            />
            <BottomNavigationTab
              title={I18n.t('tabs.chat')}
              icon={MessageCircleIcon}
            />
            <BottomNavigationTab
              title={I18n.t('tabs.settings')}
              icon={GridIconOutline}
            />
          </BottomNavigation>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export const Menu = withStyles(MenuComponent, theme => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
