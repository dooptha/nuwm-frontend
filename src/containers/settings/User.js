import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Input,
  Button,
  withStyles,
} from 'react-native-ui-kitten';
import { StateContext } from '../../utils/context';
import { removeKey } from '../../utils/storage';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);

    const user = props.navigation.getParam('currentUser');

    this.state = {
      name: user.name,
      group: user.group,
    };
  }

  onInputChange(stateChange) {
    this.setState(stateChange);
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
    const { name, group } = this.state;
    const { themedStyle } = this.props;
    return (
      <View style={themedStyle.container}>
        <Text category="h1">User settings</Text>
        <Input
          name="name"
          value={name}
          onChangeText={(text) => this.onInputChange({ name: text })}
          autoCompleteType="name"
        />
        <Input
          name="group"
          value={group}
          onChangeText={(text) => this.onInputChange({ group: text })}
          autoCapitalize="characters"
        />
        <Button
          status="danger"
          onPress={() => this.logOut()}
        >
          Вийти
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
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
}));
