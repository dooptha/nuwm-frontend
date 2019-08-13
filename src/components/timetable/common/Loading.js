import React, { Component } from 'react';
import {
  Animated, Easing, View, Image,
} from 'react-native';
import { withStyles, Text, ListItem } from 'react-native-ui-kitten';
import { LoaderOutlineIcon } from '../../../assets/icons';

class Loading extends Component {
  state = {
    rotationValue: new Animated.Value(0),
  }

  constructor(props) {
    super(props);

    this.rotatingRange = {
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    const { rotationValue } = this.state;
    rotationValue.setValue(0);

    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.startAnimation();
    });
  }

  render() {
    const { themedStyle } = this.props;
    const { rotationValue } = this.state;

    return (
      <View style={themedStyle.loadingWrapper}>
        <Animated.Image
          source={require('../../../assets/icons/eva/loader-outline.png')}
          style={[themedStyle.iconStyle, {
            transform: [
              { rotate: rotationValue.interpolate(this.rotatingRange) },
              { perspective: 1000 },
            ],
          }]}
        >
        </Animated.Image>
        <Text style={themedStyle.label}>Updating Schedule</Text>
      </View>
    );
  }
}

export default withStyles(Loading, (theme) => ({
  loadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'background-basic-color-1',
    paddingTop: 10,
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 5,
  },
  iconStyle: {
    width: 30,
    tintColor: theme['text-basic-color'],
    height: 30,
  },
  label: {
    marginLeft: 10,
    paddingTop: 5,
  },
}));
