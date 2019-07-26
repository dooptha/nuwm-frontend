import React from 'react';
import { SafeAreaView as SafeAreaViewReactNavigation } from 'react-navigation';

const SafeAreaView = (props) => (
  <SafeAreaViewReactNavigation
    forceInset={{ top: 'always' }}
    {...props}
  />
);

export default SafeAreaView;
