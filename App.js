import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { YellowBox } from 'react-native';
import { DynamicStatusBar } from './src/components/common';
import Router from './src/navigation/routes';
import { themes, customMapping } from './src/utils/themes';
import { GlobalState, useGlobalState } from './src/utils/context';
import NavigationService from './src/navigation/NavigationService';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

const App = () => {
  const [{ app }] = useGlobalState();

  return (
    <ApplicationProvider
      mapping={mapping}
      customMapping={customMapping}
      theme={themes[app.properties.theme]}
    >
      <DynamicStatusBar currentTheme={app.properties.theme} />
      <Router
        ref={
          (navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    </ApplicationProvider>
  );
};

export default () => (
  <GlobalState>
    <App />
  </GlobalState>
);
