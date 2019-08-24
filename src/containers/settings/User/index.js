import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Input,
  withStyles,
  Button,
} from 'react-native-ui-kitten';
import { StateContext } from '../../../utils/context';
import { removeKey } from '../../../utils/storage';
import I18n from '../../../utils/i18n';
import { setAuthHeaders } from '../../../api';
import api from '../../../api/user';
import config from '../../../../config';

class UserContainer extends Component {
  constructor(props) {
    super(props);

    const user = props.navigation.getParam('currentUser');

    this.state = {
      username: user.username,
    };

    this.onPrivatePolicyButtonPress = this.onPrivatePolicyButtonPress.bind(this);
  }

  componentDidMount() {
    const [, dispatch] = this.context;

    dispatch({
      type: 'setAction',
      key: 'submitUserForm',
      callback: () => this.onFormSubmit(),
    });
  }

  onInputChange({ username }) {
    if (username.length > 0 && username.length <= config.MAX_USERNAME_LENGTH) {
      this.setState({ username });
    }
  }

  onFormSubmit() {
    const [, dispatch] = this.context;
    const { username } = this.state;
    const { navigation } = this.props;

    api.updateCurrentUser(dispatch, navigation, { username });
  }

  onPrivatePolicyButtonPress() {
    const { navigation } = this.props;

    navigation.navigate({
      key: 'UserSettingsContainer',
      routeName: 'WebView',
      params: {
        url: config.PRIVACY_POLICY_URL,
        title: 'Twitter',
      },
    });
  }

  getCaption() {
    const { username } = this.state;

    if (username.length >= config.MAX_USERNAME_LENGTH) {
      return I18n.t('settings.user.validations.username');
    }

    return '';
  }

  logOut() {
    const [, dispatch] = this.context;
    // Clear data from context
    dispatch({
      type: 'updateUser',
      user: {},
    });

    // Clear data from storage
    removeKey('user');

    // Remove token from axios header
    setAuthHeaders('');

    const { navigation } = this.props;

    navigation.navigate('SignUp');
  }

  render() {
    const { username } = this.state;
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <Input
          style={themedStyle.input}
          labelStyle={themedStyle.text}
          textStyle={themedStyle.text}
          label={I18n.t('settings.user.username')}
          name="username"
          value={username}
          onChangeText={(text) => this.onInputChange({ username: text })}
          autoCompleteType="name"
          caption={this.getCaption()}
        />
        <Button
          appearance="ghost"
          onPress={this.onPrivatePolicyButtonPress}
        >
          {I18n.t('settings.user.privacyPolicy')}
        </Button>
      </View>
    );
  }
}

UserContainer.contextType = StateContext;

export default withStyles(UserContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  submitButton: {
    marginTop: 50,
  },
  input: {
    paddingTop: 10,
  },
  text: {
    fontFamily: 'Roboto',
  },
}));
