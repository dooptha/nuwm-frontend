import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import ListExample from './src/components/ListExample';
import NavBar from './src/components/NavBar';

export default class App extends Component {
  render() {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <ListExample />
        <NavBar />
      </ApplicationProvider>
    );
  }
}
