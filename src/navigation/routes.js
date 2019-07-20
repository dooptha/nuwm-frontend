// eslint-disable-next-line
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {
  MenuContainer,
  SettingsContainer,
  ConversationsContainer,
} from '../containers/menu';
import {
  LanguagesContainer,
  ThemesContainer,
  UserContainer,
  PollHistory,
} from '../containers/settings';
import {
  Conversation,
  Twitter,
} from '../containers/conversations';
import {
  MenuNavigationOptions,
  ConversationNavigationOptions,
  SheduleNavigationOptions,
  UserSettingsNavigationOptions,
} from './options';
import Schedule from '../components/schedule';
import DetailedLesson from '../components/schedule/DetailedLesson';
import ScheduleList from '../components/schedule/ScheduleList';
import SplashScreen from '../containers/SplashScreen';
import SignUpScreen from '../containers/auth/SignUp';

import config from '../utils/config';

const ScheduleNavigationMap = {
  DetailedLesson: {
    screen: DetailedLesson,
    navigationOptions: MenuNavigationOptions,
  },
  ScheduleList: {
    screen: ScheduleList,
    navigationOptions: MenuNavigationOptions,
  },
};

const SettingsNavigationMap = {
  Themes: {
    screen: ThemesContainer,
    navigationOptions: MenuNavigationOptions,
  },
  Language: {
    screen: LanguagesContainer,
    navigationOptions: MenuNavigationOptions,
  },
  User: {
    screen: UserContainer,
    navigationOptions: UserSettingsNavigationOptions,
  },
  PollHistory: {
    screen: PollHistory,
    navigationOptions: MenuNavigationOptions,
  },
};

const ConversationsNavigationMap = {
  Conversation: {
    screen: Conversation,
    navigationOptions: ConversationNavigationOptions,
  },
  Twitter: {
    screen: Twitter,
    navigationOptions: MenuNavigationOptions,
  },
};

const TimetableNavigator = createStackNavigator(
  {
    Timetable: Schedule,
  }, {
    defaultNavigationOptions: SheduleNavigationOptions,
  },
);

const ConversationsNavigator = createStackNavigator(
  {
    Conversations: ConversationsContainer,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsContainer,
  }, {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const MenuNavigator = createBottomTabNavigator({
  Timetable: TimetableNavigator,
  Conversations: ConversationsNavigator,
  Settings: SettingsNavigator,
}, {
  tabBarComponent: MenuContainer,
  initialRouteName: config.INITIAL_ROUTE_NAME,
});

const AppNavigator = createStackNavigator({
  Home: MenuNavigator,
  ...SettingsNavigationMap,
  ...ConversationsNavigationMap,
  ...ScheduleNavigationMap,
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

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  SignUp: SignUpScreen,
  App: AppNavigator,
});

export default createAppRouter(InitialNavigator);
