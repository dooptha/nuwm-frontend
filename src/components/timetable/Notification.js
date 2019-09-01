import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.componentHeight = 40;
  }

  state = {
    animation: new Animated.Value(0),
  }

  componentDidMount() {
    this.appear();

    setTimeout(() => {
      this.dissappear();
    }, 5000);
  }

  appear() {
    const { animation } = this.state;

    Animated.timing(
      animation,
      {
        toValue: this.componentHeight,
        duration: 500,
        // for Android systems only, it may not work without it
        perspective: 1000,
      },
    ).start();
  }

  dissappear() {
    const { animation } = this.state;

    Animated.timing(
      animation,
      {
        toValue: 0,
        duration: 1000,
        // for Android systems only, it may not work without it
        perspective: 1000,
      },
    ).start();
  }

  render() {
    const { themedStyle } = this.props;
    const { animation } = this.state;

    return (
      <Animated.View style={[themedStyle.mess, { height: animation }]}>
        <Text style={themedStyle.messText}>Не удалось обновить расписание</Text>
      </Animated.View>
    );
  }
}

export default withStyles(Notification, (theme) => ({
  mess: {
    alignItems: 'center',
    backgroundColor: theme['background-basic-color-2'],
    borderBottomColor: theme['border-basic-color-4'],
    borderBottomWidth: 1,
  },
  messText: {
    color: theme['text-basic-color'],
    paddingTop: 10,
  },
}));
