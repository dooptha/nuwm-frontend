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
import { AvoidKeyboard } from '../../components/common';
import { StateContext } from '../../utils/context';
import I18n from '../../utils/i18n';
import { signUp } from '../../api/user';

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
    const [{ app }, dispatch] = this.context;
    const { name, group } = this.state;
    const { navigation } = this.props;

    signUp(dispatch, navigation, {
      deviceId: app.deviceId,
      name,
      group,
    });
  }

  renderIndicator(shouldRender) {
    return shouldRender ? <ActivityIndicator /> : null;
  }

  render() {
    const [{ user }] = this.context;
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
          {I18n.t('SignUp.title')}
        </Text>
        <Input
          style={themedStyle.input}
          label={I18n.t('SignUp.name')}
          name="name"
          returnKeyType="next"
          value={name}
          onChangeText={(text) => this.setState({ name: text })}
          onSubmitEditing={() => this.focusTheField('group')}
        />
        <Input
          style={themedStyle.input}
          label={I18n.t('SignUp.group')}
          name="group"
          returnKeyType="done"
          value={group}
          onChangeText={(text) => this.setState({ group: text })}
          ref={(input) => this.setInputRef(input, 'group')}
        />
        <View style={themedStyle.buttonContainer}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 2 }}>
            <Button
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
      </AvoidKeyboard>
    );
  }
}

SignUp.contextType = StateContext;

export default withStyles(SignUp, (theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: theme['background-basic-color-1'],
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
    flexDirection: 'row',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
