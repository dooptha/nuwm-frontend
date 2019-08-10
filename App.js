import React from 'react';
import { YellowBox } from 'react-native';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { DynamicStatusBar } from './src/components/common';
import Router from './src/navigation/routes';
import { themes, customMapping } from './src/utils/themes';
import { GlobalState, useGlobalState } from './src/utils/context';
import NavigationService from './src/navigation/NavigationService';
import { setupExceptionHandlers } from './src/utils/errors';

import SwitchThemeButton from './src/components/common/SwitchThemeButton';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);

setupExceptionHandlers();

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
      <SwitchThemeButton />
    </ApplicationProvider>
  );
};

export default () => (
  <GlobalState>
    <App />
  </GlobalState>
);
