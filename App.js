import React, { Component } from 'react';
import { mapping, light as lightTheme, dark } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import { Router } from './src/core/navigation/routes';

export default class App extends Component {
  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={dark}>
        <Router />
      </ApplicationProvider>
    );
  }
}
