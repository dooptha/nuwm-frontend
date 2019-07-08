import React, { Component } from 'react';
import {
  Animated,
  Easing,
  EventSubscription,
  Keyboard,
  KeyboardEvent,
  KeyboardEventName,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
  ViewStyle,
} from 'react-native';

export class AvoidKeyboard extends Component {
  constructor(props) {
    super(props);

    if(props.offset) {
      this.offset = props.offse;
    } else {
      this.offset = (height) => (height);
    }

    this.autoDismiss = props.autoDismiss || true;
    this.translateY = new Animated.Value(0);
    this.number = Platform.select({
      android: 160,
      default: 250,
    });
    this.showEvent = Platform.select({
      android: 'keyboardDidShow',
      default: 'keyboardWillShow',
    });
    this.hideEvent = Platform.select({
      android: 'keyboardDidHide',
      default: 'keyboardWillHide',
    });
  }

  componentDidMount() {
    this.keyboardShowSubscription = Keyboard.addListener(this.showEvent, (e) => this.onKeyboardShow(e));
    this.keyboardHideSubscription = Keyboard.addListener(this.hideEvent, (e) => this.onKeyboardHide(e));
  }

  componentWillUnmount() {
    this.keyboardShowSubscription.remove();
    this.keyboardHideSubscription.remove();
  }

  onKeyboardShow(event) {
    const offset = -this.props.offset(event.endCoordinates.height);

    this.createTranslateAnimation({ offset }).start();
  };

  onKeyboardHide(event) {
    const offset = 0;

    this.createTranslateAnimation({ offset }).start();
  };

  onContainerPress() {
    Keyboard.dismiss();
  };

  getComponentStyle(source) {
    return {
      ...styles.container,
      ...styles.transform(this.translateY),
      ...StyleSheet.flatten(source),
    };
  };

  createTranslateAnimation(params) {
    const { offset } = params;

    return Animated.timing(this.translateY, {
      toValue: offset,
      duration: this.animationDuration,
      easing: Easing.linear,
    });
  };

  render() {
    const { style, autoDismiss, ...restProps } = this.props;
    const componentStyle = this.getComponentStyle(style);

    return (
      <TouchableWithoutFeedback
        onPress={this.onContainerPress}
        disabled={!autoDismiss}>
        <Animated.View
          style={componentStyle}
          {...restProps}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transform: (y: Animated.Value) => ({
    transform: [{ translateY: y }],
  }),
});
