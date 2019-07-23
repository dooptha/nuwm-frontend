import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Input,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { StateContext } from '../../../utils/context';
import { removeKey, storeObject } from '../../../utils/storage';
import I18n from '../../../utils/i18n';

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
    const user = { name };

    dispatch({
      type: 'updateUser',
      user,
    });

    storeObject('user', user);

    const { navigation } = this.props;

    navigation.goBack();
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

    const { navigation } = this.props;

    navigation.navigate('SignUp');
  }

  render() {
    const [{ user }] = this.context;
    const { name } = this.state;
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <Input
          style={themedStyle.input}
          label={I18n.t('settings.user.name')}
          name="name"
          value={name}
          onChangeText={(text) => this.onInputChange({ name: text })}
          autoCompleteType="name"
        />
        <Input
          style={themedStyle.input}
          label="access-token"
          name="accessToken"
          value={user.current.accessToken}
          disabled
        />
        <Button
          style={themedStyle.submitButton}
          status="danger"
          onPress={() => this.logOut()}
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
}));
