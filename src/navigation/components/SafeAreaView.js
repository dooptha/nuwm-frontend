import React from 'react';
import { SafeAreaView as SafeAreaViewReactNavigation } from 'react-navigation';

const SafeAreaView = (props) => (
  <SafeAreaViewReactNavigation
    forceInset={{ top: 'never', bottom: 'always' }}
    {...props}
  />
);

export default SafeAreaView;
