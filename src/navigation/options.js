import React from 'react';
import { ArrowIosBackFill } from '../assets/icons';
import TopNavigationBar from './components/TopNavigationBar';
import {
  getCurrentRouteState,
  isRootRoute,
  getCurrentRouteIndex,
} from './util';
import { KEY_NAVIGATION_BACK } from './constants';
import I18n from '../utils/i18n';
import { StateContext } from '../utils/context';

const MenuTopNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          () => (
            <TopNavigationBar
              border
              title={I18n.t(`routes.${routeName}`)}
              backIcon={isRootRoute(index) && ArrowIosBackFill}
              onBackPress={() => navigation.goBack(KEY_NAVIGATION_BACK)}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const SheduleTopNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          () => (
            <TopNavigationBar
              title={I18n.t(`routes.${routeName}`)}
              backIcon={isRootRoute(index) && ArrowIosBackFill}
              onBackPress={() => navigation.goBack(KEY_NAVIGATION_BACK)}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const ConversationTopNavigationParams = {
  header: ({ navigation }) => {
    const index = getCurrentRouteIndex(navigation);

    const route = navigation.state.routes[1];
    const { title } = route ? route.params.conversation : '';

    return (
      <StateContext.Consumer>
        {
          () => (
            <TopNavigationBar
              border
              title={title}
              backIcon={isRootRoute(index) && ArrowIosBackFill}
              onBackPress={() => {
                navigation.goBack(KEY_NAVIGATION_BACK);
              }}
            />
          )
        }
      </StateContext.Consumer>
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
