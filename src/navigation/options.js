import React from 'react';
import {
  ArrowIosBackFill,
  CheckmarkOutlineIcon,
} from '../assets/icons';
import TopNavigationBar from './components/TopNavigationBar';
import {
  getCurrentRouteState,
  isRootRoute,
  getCurrentRouteIndex,
} from './util';
import I18n from '../utils/i18n';

const MenuTopNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <TopNavigationBar
        border
        title={I18n.t(`routes.${routeName}`)}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        rightControls={[]}
        onBackPress={() => navigation.goBack(null)}
      />
    );
  },
};

const SheduleTopNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <TopNavigationBar
        title={I18n.t(`routes.${routeName}`)}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => navigation.goBack(null)}
      />
    );
  },
};

const ConversationTopNavigationParams = {
  header: ({ navigation }) => {
    const index = getCurrentRouteIndex(navigation);

    const route = navigation.state.routes[1];
    const { title } = route ? route.params.conversation : '';

    return (
      <TopNavigationBar
        border
        title={title}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => navigation.goBack(null)}
      />
    );
  },
};

const UserSettingsNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);

    return (
      <TopNavigationBar
        border
        title={I18n.t(`routes.${routeName}`)}
        backIcon={ArrowIosBackFill}
        submitIcon={CheckmarkOutlineIcon}
        onBackPress={() => navigation.goBack(null)}
        onSubmitPress="submitUserForm"
      />
    );
  },
};

const TimetableSettingsNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);

    return (
      <TopNavigationBar
        border
        title={I18n.t(`routes.${routeName}`)}
        backIcon={ArrowIosBackFill}
        submitIcon={CheckmarkOutlineIcon}
        onBackPress={() => navigation.goBack(null)}
        onSubmitPress="submitTimetableForm"
      />
    );
  },
};

export const MenuNavigationOptions = {
  ...MenuTopNavigationParams,
};

export const SheduleNavigationOptions = {
  ...SheduleTopNavigationParams,
};

export const ConversationNavigationOptions = {
  ...ConversationTopNavigationParams,
};

export const UserSettingsNavigationOptions = {
  ...UserSettingsNavigationParams,
};

export const TimetableSettingsNavigationOptions = {
  ...TimetableSettingsNavigationParams,
};
