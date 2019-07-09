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
  MenuNavigationOptions,
} from './options';

import Schedule from '../../components/schedule'
import DetailedLesson from '../../components/schedule/DetailedLesson'

class ChatScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chat!</Text>
      </View>
    );
  }
}

class ThemesContainer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Themes!</Text>
      </View>
    );
  }
}

class LanguageContainer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Langiage!</Text>
      </View>
    );
  }
}

const ScheduleNavigationMap = {
  ['DetailedLesson']: {
    screen: DetailedLesson,
    navigationOptions: MenuNavigationOptions
  }
}

const SettingsNavigationMap = {
  ['Themes']: {
    screen:ThemesContainer,
    navigationOptions: MenuNavigationOptions,
  },
  ['Language']: {
    screen:LanguageContainer,
    navigationOptions: MenuNavigationOptions,
  }
};

const TimetableNavigator = createStackNavigator(
  {
    ['Timetable']: Schedule,
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
  ...ScheduleNavigationMap
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
