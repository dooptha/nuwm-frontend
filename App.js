import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { DynamicStatusBar } from './src/components/common';
import Router from './src/navigation/routes';
import themes from './src/utils/themes';
import { GlobalState, useGlobalState } from './src/utils/context';
import NavigationService from './src/navigation/NavigationService';

const App = () => {
  const [globals] = useGlobalState();
  const { theme } = globals.properties;

  return (
    <ApplicationProvider
      mapping={mapping}
      theme={themes[theme]}
    >
      <DynamicStatusBar currentTheme={theme} />
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
