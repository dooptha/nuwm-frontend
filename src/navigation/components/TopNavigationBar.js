import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import SafeAreaView from './SafeAreaView';
import { StateContext } from '../../utils/context';
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
    const [{ app }] = this.context;
    const { onSubmitPress } = this.props;
    const onPress = app.actions[onSubmitPress];

    if (onPress) {
      return (
        <TopNavigationAction
          icon={source}
          onPress={onPress}
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
    } = this.props;

    const [{ app }] = this.context;
    const controls = [];

    if (!app.connected) {
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
    } = this.props;

    const [{ app }] = this.context;
    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView
        style={border ? themedStyle.safeAreaWithBorder : themedStyle.safeArea}
        forceInset={{ top: 'always', bottom: 'never' }}
      >
        <TopNavigation
          alignment="center"
          title={app.connected ? title : I18n.t('routes.disconnected')}
          titleStyle={themedStyle.title}
          leftControl={leftControlElement}
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

TopNavigationBar.contextType = StateContext;

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
