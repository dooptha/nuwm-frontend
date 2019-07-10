import React from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { DynamicStatusBar } from './src/components/common';
import { Router } from './src/core/navigation/routes';
import { themes } from './src/core/themes';
import { GlobalState, useGlobalState } from './src/core/utils/context';
import NavigationService from './src/core/navigation/NavigationService';

const App = () => {
  const [globals] = useGlobalState();
  const theme = themes[globals.properties.theme];

  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}
    >
      <DynamicStatusBar currentTheme={theme} />
      <Router
        ref={
          navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)
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
