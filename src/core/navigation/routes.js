import React from 'react';
import { View, Text } from 'react-native';
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import {
  MenuContainer,
  SettingsContainer
} from '../../containers/menu';

import {
  LanguageContainer,
  ThemeContainer
} from '../../containers/settings';

import {
  MenuNavigationOptions,
} from './options';

import { useStateValue } from '../utils/context';



class TimetableScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Timetable!</Text>
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

const SettingsNavigationMap = {
  ['Themes']: {
    screen: ThemeContainer,
    navigationOptions: MenuNavigationOptions,
  },
  ['Language']: {
    screen: LanguageContainer,
    navigationOptions: MenuNavigationOptions,
  }
};

const TimetableNavigator = createStackNavigator(
  {
    ['Timetable']: TimetableScreen,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const ChatNavigator = createStackNavigator(
  {
    ['Chat']: ChatScreen,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const SettingsNavigator = createStackNavigator(
  {
    ['Settings']: SettingsContainer,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const MenuNavigator = createBottomTabNavigator({
  Timetable: TimetableNavigator,
  Chat: ChatNavigator,
  Settings: SettingsNavigator
}, {
  tabBarComponent: MenuContainer,
});

const AppNavigator = createStackNavigator({
  ['Home']: MenuNavigator,
  ...SettingsNavigationMap,
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

const App = () => {
  useStateValue();
  return(<AppNavigator />)
}

export const Router = createAppRouter(AppNavigator);
