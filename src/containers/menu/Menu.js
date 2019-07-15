import React from 'react';
import {
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import { SafeAreaView } from '../../navigation';
import {
  GridIconOutline,
  LayoutIconOutline,
  MessageCircleIcon,
} from '../../assets/icons';
import I18n from '../../utils/i18n';
import { StateContext } from '../../utils/context';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabSelect = this.onTabSelect.bind(this);
  }

  onTabSelect(index) {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    navigation.navigate({
      key: 'MenuContainer',
      routeName: selectedRoute.routeName,
    });
  }

  render() {
    const { themedStyle, navigation } = this.props;

    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <BottomNavigation
          appearance="noIndicator"
          selectedIndex={navigation.state.index}
          onSelect={this.onTabSelect}
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
      </SafeAreaView>
    );
  }
}

MenuContainer.contextType = StateContext;

export default withStyles(MenuContainer, (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
