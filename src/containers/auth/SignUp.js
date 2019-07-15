import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Input,
  Text,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { AvoidKeyboard } from '../../components/common';
import { StateContext } from '../../utils/context';
import { storeObject } from '../../utils/storage';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      name: '',
      group: '',
    };
  }

  setInputRef(input, id) {
    this.inputs[id] = input;
  }

  focusTheField(id) {
    this.inputs[id].focus();
  }

  canSubmitForm() {
    const { name, group } = this.state;
    return name !== '' && group !== '';
  }

  submitForm() {
    const [, dispatch] = this.context;
    const { name, group } = this.state;
    const user = { name, group };
    dispatch({
      type: 'updateUser',
      user,
    });

    // Should store user after successful validation on server
    storeObject('user', user);

    // Should navigate to app after successful validation on server
    const { navigation } = this.props;
    navigation.navigate('App');
  }

  render() {
    const { name, group } = this.state;
    const { themedStyle } = this.props;

    return (
      <AvoidKeyboard
        style={themedStyle.container}
        autoDismiss
        offset={() => 0}
      >
        <Text
          style={themedStyle.title}
          category="h6"
        >
          Перед тим як почати
        </Text>
        <Input
          style={themedStyle.input}
          name="name"
          placeholder="Ім'я"
          returnKeyType="next"
          value={name}
          onChangeText={(text) => this.setState({ name: text })}
          onSubmitEditing={() => this.focusTheField('group')}
        />
        <Input
          style={themedStyle.input}
          name="group"
          placeholder="Група"
          returnKeyType="done"
          value={group}
          onChangeText={(text) => this.setState({ group: text })}
          ref={(input) => this.setInputRef(input, 'group')}
        />
        <View style={themedStyle.buttonContainer}>
          <Button
            style={themedStyle.button}
            disabled={!this.canSubmitForm()}
            onPress={() => this.submitForm()}
          >
            Почати
          </Button>
        </View>
      </AvoidKeyboard>
    );
  }
}

SignUp.contextType = StateContext;

export default withStyles(SignUp, () => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    paddingBottom: 10,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    paddingTop: 20,
  },
}));
