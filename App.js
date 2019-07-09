import React, { Component } from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import { DynamicStatusBar } from './src/components/common';
import { Router } from './src/core/navigation/routes';
import NavigationService from './src/core/navigation/NavigationService'
import {
  themes
} from './src/core/themes';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'Eva Dark',
    };
  }

  onTransitionTrackError(error) {
    console.warn('Analytics error: ', error.message);
  }

  onNavigationStateChange(prevState, currentState) {
    const prevStateName = getCurrentStateName(prevState);
    const currentStateName = getCurrentStateName(currentState);

    if (prevStateName !== currentStateName) {
      trackScreenTransition(currentStateName)
        .catch(this.onTransitionTrackError);
    }
  }

  onSwitchTheme(theme) {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({ theme });
    });
  }

  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={themes[this.state.theme]}>
        <DynamicStatusBar currentTheme={this.state.theme}/>
        <Router
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ApplicationProvider>
    );
  }
}
