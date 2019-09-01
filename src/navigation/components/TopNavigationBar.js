import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import SafeAreaView from './SafeAreaView';
import I18n from '../../utils/i18n';

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

    if (onSubmitPress) {
      return (
        <TopNavigationAction
          icon={source}
          onPress={onSubmitPress}
        />
      );
    }

    return null;
  }

  renderDisconnectedLoader() {
    return <ActivityIndicator />;
  }

  renderRightControls() {
    const {
      submitIcon,
      onSubmitPress,
      connected,
    } = this.props;

    const controls = [];

    if (!connected) {
      controls.push(this.renderDisconnectedLoader());
    }

    if (submitIcon && onSubmitPress) {
      controls.push(this.renderSubmitButton(submitIcon));
    }

    return controls;
  }

  render() {
    const {
      themedStyle,
      title,
      backIcon,
      border,
      connected,
    } = this.props;

    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView
        style={border ? themedStyle.safeAreaWithBorder : themedStyle.safeArea}
        forceInset={{ top: 'always', bottom: 'never' }}
      >
        <TopNavigation
          alignment="center"
          title={connected ? title : I18n.t('routes.disconnected')}
          titleStyle={themedStyle.title}
          leftControl={leftControlElement}
          rightControls={this.renderRightControls()}
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
