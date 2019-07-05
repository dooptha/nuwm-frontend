import React from 'react';
import { View, Text } from 'react-native';
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import {
  MenuContainer
} from '../../containers/menu';

class TimetableScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Timetable!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chat!</Text>
      </View>
    );
  }
}

// , {
//   // tabBarComponent: MenuContainer,
// }
const MenuNavigator = createBottomTabNavigator({
  Timetable: TimetableScreen,
  Chat: ChatScreen,
  Settings: SettingsScreen
}, {
  tabBarComponent: MenuContainer,
});

const AppNavigator = createStackNavigator({
  ['Home']: MenuNavigator
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
  },
});

const createAppRouter = (container) => {
  useScreens();
  return createAppContainer(container);
};

export const Router = createAppRouter(AppNavigator);
