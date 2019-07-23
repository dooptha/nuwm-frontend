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
} from '../containers/settings';
import ConversationContainer from '../containers/conversations/Conversation';
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
};

const ConversationsNavigationMap = {
  Conversation: {
    screen: ConversationContainer,
    navigationOptions: ConversationNavigationOptions,
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
  initialRouteName: 'Timetable',
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
