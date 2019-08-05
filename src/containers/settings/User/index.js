import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Input,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { StateContext } from '../../../utils/context';
import { removeKey } from '../../../utils/storage';
import I18n from '../../../utils/i18n';
import { setAuthHeaders } from '../../../api';
import api from '../../../api/user';

class UserContainer extends Component {
  constructor(props) {
    super(props);

    const user = props.navigation.getParam('currentUser');

    this.state = {
      name: user.name,
    };
  }

  componentDidMount() {
    const [, dispatch] = this.context;

    dispatch({
      type: 'setAction',
      key: 'submitUserForm',
      callback: () => this.onFormSubmit(),
    });
  }

  onInputChange(stateChange) {
    this.setState(stateChange);
  }

  onFormSubmit() {
    const [, dispatch] = this.context;
    const { name } = this.state;
    const { navigation } = this.props;

    api.updateCurrentUser(dispatch, navigation, { name });
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
    const { name } = this.state;
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <Input
          style={themedStyle.input}
          labelStyle={themedStyle.text}
          textStyle={themedStyle.text}
          label={I18n.t('settings.user.name')}
          name="name"
          value={name}
          onChangeText={(text) => this.onInputChange({ name: text })}
          autoCompleteType="name"
        />
        <Button
          style={themedStyle.submitButton}
          status="danger"
          onPress={() => this.logOut()}
          textStyle={themedStyle.text}
        >
          {I18n.t('settings.user.logOut')}
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
