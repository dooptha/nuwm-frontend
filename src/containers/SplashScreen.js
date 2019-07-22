import React, { Component } from 'react';
import { View } from 'react-native';
import { StateContext, loadInitialData } from '../utils/context';
import { getLastPoll } from '../api/poll';

class SplashScreen extends Component {
  async componentDidMount() {
    const [, dispatch] = this.context;
    const currentUser = await loadInitialData(dispatch);
    const { navigation } = this.props;

    // getLastPoll(dispatch);

    if (currentUser && currentUser.name !== '') {
      navigation.navigate('App');
    } else {
      navigation.navigate('SignUp');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

SplashScreen.contextType = StateContext;
export default SplashScreen;
