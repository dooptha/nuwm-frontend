import React, { Component } from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import { DynamicStatusBar } from './src/components/common';
import { Router } from './src/core/navigation/routes';
import { themes } from './src/core/themes';
import { getProperties, DEFAULT_PROPERTIES } from './src/core/utils/properties';
import { setLocale } from './src/core/localization';

import { GlobalState, StateContext } from './src/core/utils/context';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: DEFAULT_PROPERTIES
    };

    this.propertiesLoaded = false;
  }

  loadProperties(context) {
    if(this.propertiesLoaded)
      return true

    this.propertiesLoaded = true;
    getProperties()
      .then((properties) => {
        setLocale(properties.language);

        context[1]({
          type: 'loadProperties',
          properties: properties
        })
      });
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

  //asdad

  render() {
    return (
      <GlobalState initialState={this.state}>
        <StateContext.Consumer>
        {
          (context) => {
            this.loadProperties(context);

            return (
              <ApplicationProvider
                mapping={mapping}
                theme={themes[context[0].properties.theme]}>
                <DynamicStatusBar currentTheme={context[0].properties.theme}/>
                <Router />
              </ApplicationProvider>
            )
          }
        }
        </StateContext.Consumer>
      </GlobalState>
    );
  }
}
