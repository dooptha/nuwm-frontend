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
} from '../containers/conversations';
import {
  MenuNavigationOptions,
  SheduleNavigationOptions,
  UserSettingsNavigationOptions,
  TimetableSettingsNavigationOptions,
  WebViewNavigationOptions,
} from './options';
import Schedule from '../components/timetable';
import DetailedLesson from '../components/timetable/LessonScreen';
import ScheduleList from '../components/timetable/Schedule';
import SplashScreen from '../containers/SplashScreen';
import SignUpScreen from '../containers/auth/SignUp';
import NewPoll from '../containers/admin/NewPoll';
import WebView from '../containers/common/WebView';

import config from '../../config';

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
  WebView: {
    screen: WebView,
    navigationOptions: WebViewNavigationOptions,
  },
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
  },
});

const AuthNavigator = createStackNavigator({
  Home: SignUpScreen,
  WebView: {
    screen: WebView,
    navigationOptions: WebViewNavigationOptions,
  },
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
  SignUp: AuthNavigator,
  App: AppNavigator,
});

export default createAppRouter(InitialNavigator);
