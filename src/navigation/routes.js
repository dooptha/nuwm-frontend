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
  TimetableSettings,
  ContactUs,
} from '../containers/settings';
import {
  Conversation,
  Twitter,
  Instagram,
} from '../containers/conversations';
import {
  MenuNavigationOptions,
  ConversationNavigationOptions,
  SheduleNavigationOptions,
  UserSettingsNavigationOptions,
  TimetableSettingsNavigationOptions,
} from './options';
import Schedule from '../components/timetable';
import DetailedLesson from '../components/timetable/LessonScreen';
import SearchScreen from '../components/timetable/search/SearchScreen';
import SplashScreen from '../containers/SplashScreen';
import SignUpScreen from '../containers/auth/SignUp';
import NewPoll from '../containers/admin/NewPoll';

import config from '../../config';

const ScheduleNavigationMap = {
  DetailedLesson: {
    screen: DetailedLesson,
    navigationOptions: MenuNavigationOptions,
  },
  SearchScreen: {
    screen: SearchScreen,
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
  TimetableSettings: {
    screen: TimetableSettings,
    navigationOptions: TimetableSettingsNavigationOptions,
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: MenuNavigationOptions,
  },
  Admin: {
    screen: NewPoll,
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
  Instagram: {
    screen: Instagram,
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
  lazy: true,
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
