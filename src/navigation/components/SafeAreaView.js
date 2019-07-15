import React, { Component } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView as SafeAreaViewReactNavigation } from 'react-navigation';

class SafeAreaView extends Component {
  constructor(props) {
    super(props);

    // Additional heigh of buttom navigation bar
    this.statusBarHeight = Platform.select({
      ios: 0,
      android: 0,
    });
  }

  componentDidMount() {
    SafeAreaViewReactNavigation.setStatusBarHeight(this.statusBarHeight);
  }

  render() {
    return <SafeAreaViewReactNavigation {...this.props} />;
  }
}

export default SafeAreaView;
