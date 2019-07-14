import React from 'react';
import { View } from 'react-native';
import { StateContext, loadInitialData } from '../utils/context';

class SplashScreen extends React.Component {
  async componentDidMount() {
    const [, dispatch] = this.context;
    const currentUser = await loadInitialData(dispatch);
    const { navigation } = this.props;

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
