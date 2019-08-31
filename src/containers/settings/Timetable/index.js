import React, { Component } from 'react';
import { View } from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import GroupInput from '../../common/GroupInput';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';
import I18n from '../../../utils/i18n';

class TimetableSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const [{ app }, dispatch] = this.context;
    const { group } = app.properties;

    this.setState({
      group,
    });

    dispatch({
      type: 'setAction',
      key: 'submitTimetableForm',
      callback: () => this.onFormSubmit(),
    });
  }

  onInputChange(stateChange) {
    this.setState(stateChange);
  }

  onFormSubmit() {
    const [, dispatch] = this.context;
    const { group } = this.state;

    dispatch({
      type: 'setProperty',
      key: 'group',
      value: group,
    });

    storeKey('group', group);

    const { navigation } = this.props;

    navigation.goBack();
  }

  render() {
    const { group } = this.state;
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <GroupInput
          labelStyle={themedStyle.text}
          textStyle={themedStyle.text}
          label={I18n.t('settings.user.group')}
          name="group"
          value={group}
          onChangeText={(text) => this.onInputChange({ group: text })}
        />
      </View>
    );
  }
}

TimetableSettings.contextType = StateContext;

export default withStyles(TimetableSettings, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    margin: 50,
    flex: 1,
  },
  submitButton: {
    marginTop: 50,
  },
  text: {
    fontFamily: 'Roboto',
  },
}));
