import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import {
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from 'react-native-ui-kitten';
import { SafeAreaView } from '../../../navigation';
import {
  GridIconOutline,
  LayoutIconOutline,
  MessageCircleIcon,
} from '../../../assets/icons';
import I18n from '../../../utils/i18n';
import { connect } from '../../../utils/context';

class MenuContainer extends PureComponent {
  static whyDidYouRender = true;

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

  renderMessageIconWithCounter(style) {
    const { themedStyle, unreadCounter } = this.props;

    return (
      <View>
        {MessageCircleIcon(style)}
        {
          unreadCounter > 0 ? (
            <View style={themedStyle.badgeContainer}>
              <Text style={themedStyle.badgeTitle}>{unreadCounter}</Text>
            </View>
          ) : null
        }
      </View>
    );
  }

  render() {
    const { themedStyle, navigation } = this.props;

    return (
      <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always' }}
        style={themedStyle.safeAreaContainer}
      >
        <BottomNavigation
          appearance="noIndicator"
          selectedIndex={navigation.state.index}
          onSelect={this.onTabSelect}
        >
          <BottomNavigationTab
            titleStyle={themedStyle.text}
            title={I18n.t('tabs.timetable')}
            icon={LayoutIconOutline}
          />
          <BottomNavigationTab
            titleStyle={themedStyle.text}
            title={I18n.t('tabs.chat')}
            icon={(style) => this.renderMessageIconWithCounter(style)}
          />
          <BottomNavigationTab
            titleStyle={themedStyle.text}
            title={I18n.t('tabs.settings')}
            icon={GridIconOutline}
          />
        </BottomNavigation>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  unreadCounter: state.conversations.unreadCounter,
  language: state.app.properties.language,
});

const wrappedMenu = withStyles(connect(mapStateToProps)(MenuContainer), (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
  text: {
    fontFamily: 'Roboto',
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: 0,
    backgroundColor: '#FF3566',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  badgeTitle: {
    color: 'white',
  },
}));

console.log('wrappedMenu', wrappedMenu);

export default wrappedMenu;
