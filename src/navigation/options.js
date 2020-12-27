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
import EmptyTopNavigationBar from './components/EmptyTopNavigationBar';

const backIconIfNeeded = (index) => (
  isRootRoute(index)
    ? ArrowIosBackFill : null
);

export const MenuNavigationOptions = {
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

export const UserSettingsNavigationOptions = {
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

export const TimetableSettingsNavigationOptions = {
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

export const WebViewNavigationOptions = {
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

export const NoHeaderNavigationOptions = (themeBackgroundColor) => ({
  header: () => <EmptyTopNavigationBar themeBackgroundColor={themeBackgroundColor} />,
});

export const HeaderNoBorderNavigationOptions = {
  header: ({ navigation }) => {
    const { routeName } = getCurrentRouteState(navigation);
    const index = getCurrentRouteIndex(navigation);

    return (
      <StateContext.Consumer>
        {
          () => (
            <TopNavigationBar
              title={I18n.t(`routes.${routeName}`)}
              backIcon={backIconIfNeeded(index)}
              onBackPress={() => navigation.goBack(null)}
              connected
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};
