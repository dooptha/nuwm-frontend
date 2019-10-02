import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

const styles = {
  icon: {
    width: 30,
    height: 30,
  },
};

export default class ActivityIndicator extends Component {
  state = {
    animation: new Animated.Value(0),
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
    const { animation } = this.state;

    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.startAnimation();
    });
  }

  render() {
    const { color } = this.props;
    const { animation } = this.state;

    return (
      <Animated.Image
        source={require('../../../assets/icons/eva/loader-outline.png')}
        style={[styles.icon, {
          tintColor: color || 'white',
          transform: [
            { rotate: animation.interpolate(this.rotatingRange) },
            { perspective: 1000 },
          ],
        }]}
      >
      </Animated.Image>
    );
  }
}
