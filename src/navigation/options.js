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
import { StateContext } from '../utils/context';

const backIconIfNeeded = (index) => (
  isRootRoute(index)
    ? ArrowIosBackFill : null
);

const MenuTopNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          ([{ app }]) => (
            <TopNavigationBar
              border
              title={I18n.t(`routes.${routeName}`)}
              backIcon={backIconIfNeeded(index)}
              onBackPress={() => navigation.goBack(null)}
              connected={app.connected}
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
          ([{ app }]) => (
            <TopNavigationBar
              title={I18n.t(`routes.${routeName}`)}
              backIcon={backIconIfNeeded(index)}
              onBackPress={() => navigation.goBack(null)}
              connected={app.connected}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const UserSettingsNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          ([{ app }]) => (
            <TopNavigationBar
              border
              title={I18n.t(`routes.${routeName}`)}
              backIcon={backIconIfNeeded(index)}
              submitIcon={CheckmarkOutlineIcon}
              onBackPress={() => navigation.goBack(null)}
              onSubmitPress={app.actions.submitUserForm}
              connected={app.connected}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const TimetableSettingsNavigationParams = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          ([{ app }]) => (
            <TopNavigationBar
              border
              title={I18n.t(`routes.${routeName}`)}
              backIcon={backIconIfNeeded(index)}
              submitIcon={CheckmarkOutlineIcon}
              onBackPress={() => navigation.goBack(null)}
              onSubmitPress={app.actions.submitTimetableForm}
              connected={app.connected}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const WebViewNavigationParams = {
  header: ({ navigation }) => {
    const route = navigation.state.routes[2]
      || navigation.state.routes[1];

    const { title } = route ? route.params : '';
    const index = getCurrentRouteIndex(navigation);

    return (
      <TopNavigationBar
        border
        title={title}
        backIcon={backIconIfNeeded(index)}
        onBackPress={() => navigation.goBack(null)}
        connected
      />
    );
  },
};

export const WebViewNavigationOptions = {
  ...WebViewNavigationParams,
};

export const MenuNavigationOptions = {
  ...MenuTopNavigationParams,
};

export const SheduleNavigationOptions = {
  ...SheduleTopNavigationParams,
};

export const UserSettingsNavigationOptions = {
  ...UserSettingsNavigationParams,
};

export const TimetableSettingsNavigationOptions = {
  ...TimetableSettingsNavigationParams,
};
