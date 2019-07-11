import React from 'react';
import {
  ThemeProvider,
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import { SafeAreaView } from '../../navigation';

import themes from '../../utils/themes';
import {
  GridIconOutline,
  LayoutIconOutline,
  MessageCircleIcon,
} from '../../assets/icons';
import I18n from '../../utils/i18n';

const Menu = (props) => {
  const {
    selectedIndex,
    themedStyle,
    onTabSelect,
    theme,
  } = props;

  return (
    <SafeAreaView style={themedStyle.safeAreaContainer}>
      <ThemeProvider theme={{ ...theme, ...themes['App Theme'] }}>
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
};

export default withStyles(Menu, (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
