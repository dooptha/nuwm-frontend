import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Input,
  Text,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { AvoidKeyboard, InlineError } from '../../components/common';
import GroupInput from '../common/GroupInput';
import { StateContext } from '../../utils/context';
import I18n from '../../utils/i18n';
import api from '../../api/user';
import config from '../../../config';

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      username: '',
      group: '',
    };

    this.onPrivatePolicyButtonPress = this.onPrivatePolicyButtonPress.bind(this);
  }

  onPrivatePolicyButtonPress() {
    const { navigation } = this.props;

    navigation.navigate(
      {
        key: 'SignUp',
        routeName: 'WebView',
        params: {
          title: 'Privacy Policy',
          url: config.PRIVACY_POLICY_URL,
        },
      },
    );
  }

  setInputRef(input, id) {
    this.inputs[id] = input;
  }

  focusTheField(id) {
    this.inputs[id].focus();
  }

  canSubmitForm() {
    const { username, group } = this.state;
    return username !== '' && group !== '';
  }

  submitForm() {
    const [{ app }, dispatch] = this.context;
    const { username, group } = this.state;
    const { navigation } = this.props;

    api.logIn(dispatch, navigation, {
      deviceId: app.deviceId,
      username,
      group,
    });
  }

  renderIndicator(shouldRender) {
    return shouldRender ? <ActivityIndicator /> : null;
  }

  renderPrivacyButton() {
    const { themedStyle } = this.props;

    return (
      <Button
        appearance="ghost"
        size="small"
        status="info"
        style={themedStyle.privacyButton}
        onPress={this.onPrivatePolicyButtonPress}
      >
        <Text
          category="c1"
          style={themedStyle.privacyText}
        >
          { I18n.t('SignUp.privacyText') }
        </Text>
        { I18n.t('SignUp.privacyTitle') }
      </Button>
    );
  }

  renderSubmitButton() {
    const [{ user }] = this.context;
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.buttonContainer}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2 }}>
          <Button
            textStyle={themedStyle.text}
            disabled={!this.canSubmitForm() || user.isLoading}
            onPress={() => this.submitForm()}
          >
            {I18n.t('SignUp.submit')}
          </Button>
        </View>

        <View style={themedStyle.indicator}>
          {this.renderIndicator(user.isLoading)}
        </View>
      </View>
    );
  }

  render() {
    const [{ user }] = this.context;
    const { username, group } = this.state;
    const { themedStyle } = this.props;

    return (
      <AvoidKeyboard
        style={themedStyle.container}
        autoDismiss
        offset={() => 0}
      >
        <View style={themedStyle.titleContainer}>
          <Text
            style={[themedStyle.title, themedStyle.text]}
            category="h6"
          >
            {I18n.t('SignUp.title')}
          </Text>
        </View>
        <Input
          style={themedStyle.input}
          labelStyle={themedStyle.text}
          textStyle={themedStyle.text}
          label={I18n.t('SignUp.name')}
          name="username"
          returnKeyType="next"
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
          onSubmitEditing={() => this.focusTheField('group')}
        />
        <GroupInput
          inputReference={(ref) => this.setInputRef(ref, 'group')}
          labelStyle={themedStyle.text}
          textStyle={themedStyle.text}
          label={I18n.t('SignUp.group')}
          name="group"
          returnKeyType="done"
          value={group}
          onChangeText={(text) => this.setState({ group: text })}
        />
        { this.renderSubmitButton() }
        { this.renderPrivacyButton() }
        <InlineError error={user.error} />
      </AvoidKeyboard>
    );
  }
}

SignUp.contextType = StateContext;

export default withStyles(SignUp, (theme) => ({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: theme['background-basic-color-1'],
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    paddingBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
  },
  privacyButton: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  privacyText: {
    color: theme['text-hint-color'],
  },
}));
