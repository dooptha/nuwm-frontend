import React from 'react';
import {
} from 'react-native';
import { mapping } from '@eva-design/eva';
import {
  ApplicationProvider,
} from 'react-native-ui-kitten';
import { themes, customMapping } from '../../src/utils/themes';
import { GlobalState, useGlobalState } from '../../src/utils/context';

const App = ({ children }) => {
  const [{ app }] = useGlobalState();

  return (
    <ApplicationProvider
      mapping={mapping}
      customMapping={customMapping}
      theme={themes[app.properties.theme]}
    >
      {children}
    </ApplicationProvider>
  );
};

export default (props) => (
  <GlobalState>
    <App {...props} />
  </GlobalState>
);
