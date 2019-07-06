import React from 'react';
import { Alert } from 'react-native';
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

const MenuTopNavigationParams = {
  header: (props) => {
    // @ts-ignore (private API)
    const { routeName } = getCurrentRouteState(props.navigation);
    const index = getCurrentRouteIndex(props.navigation);

    return (
      <TopNavigationBar
        {...props}
        title={routeName}
        backIcon={ isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
      />
    );
  },
};


export const MenuNavigationOptions = {
  ...MenuTopNavigationParams,
};
