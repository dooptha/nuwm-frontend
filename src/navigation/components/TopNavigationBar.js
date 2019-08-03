import React, { Component } from 'react';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import SafeAreaView from './SafeAreaView';

class TopNavigationBar extends Component {
  renderBackButton(source) {
    const { onBackPress } = this.props;
    return (
      <TopNavigationAction
        icon={source}
        onPress={() => onBackPress()}
      />
    );
  }

  renderSubmitButton(source) {
    const { onSubmitPress } = this.props;
    return (
      <TopNavigationAction
        icon={source}
        onPress={onSubmitPress}
      />
    );
  }

  render() {
    const {
      themedStyle,
      title,
      backIcon,
      border,
      submitIcon,
    } = this.props;

    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;
    const rightControlElement = submitIcon ? this.renderSubmitButton(submitIcon) : null;

    return (
      <SafeAreaView
        style={border ? themedStyle.safeAreaWithBorder : themedStyle.safeArea}
        forceInset={{ top: 'always', bottom: 'never' }}
      >
        <TopNavigation
          alignment="center"
          title={title}
          titleStyle={themedStyle.title}
          leftControl={leftControlElement}
          rightControls={rightControlElement}
        />
      </SafeAreaView>
    );
  }
}

export default withStyles(TopNavigationBar, (theme) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
  safeAreaWithBorder: {
    backgroundColor: theme['background-basic-color-1'],
    borderBottomWidth: 1,
    borderBottomColor: theme['background-basic-color-3'],
  },
  title: {
    fontFamily: 'Roboto',
  },
}));
