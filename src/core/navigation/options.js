import React from 'react';
import {
  NavigationParams,
  NavigationScreenProps,
} from 'react-navigation';
import { ArrowIosBackFill } from '../../assets/icons';
import { TopNavigationBar } from './components/topNavigationBar.component';
import {
  getCurrentRouteState,
  isRootRoute,
  NavigationRouteState,
  getCurrentRouteIndex,
} from './util';
import { KEY_NAVIGATION_BACK } from './constants';
import I18n from '../localization';
import { StateContext } from '../../utils/context';

const MenuTopNavigationParams = {
  header: (props) => {
    const { routeName } = getCurrentRouteState(props.navigation);
    const index = getCurrentRouteIndex(props.navigation);

    return (
      <StateContext.Consumer>
        {
          (context) => (
            <TopNavigationBar
              {...props}
              title={I18n.t('routes.'+routeName)}
              backIcon={ isRootRoute(index) && ArrowIosBackFill}
              onBackPress={() => {
                props.navigation.goBack(KEY_NAVIGATION_BACK);
              }}
            />
          )
        }
      </StateContext.Consumer>
    );
  },
};

const ConversationTopNavigationParams = {
  header: (props) => {
    const { routeName } = getCurrentRouteState(props.navigation);
    const index = getCurrentRouteIndex(props.navigation);

    const route = props.navigation.state.routes[1];
    let title = '';

    if(route) {
      title = route.params.conversation.title;
    }

    return (
      <StateContext.Consumer>
        {
          (context) => (
            <TopNavigationBar
              {...props}
              title={title}
              backIcon={ isRootRoute(index) && ArrowIosBackFill}
              onBackPress={() => {
                props.navigation.goBack(KEY_NAVIGATION_BACK);
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

export const ConversationNavigationOptions = {
  ...ConversationTopNavigationParams
};
