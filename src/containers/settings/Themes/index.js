import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  withStyles,
} from 'react-native-ui-kitten';
import { Message } from '../../../components/conversations';
import data from './data';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';
import ListItem from '../../../components/settings/ListItem';
import I18n from '../../../utils/i18n';

class ThemesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: data,
    };

    this.messages = [
      {
        id: 'id',
        body: I18n.t('settings.themes.anotherUserMessage'),
        date: '12:12',
        sender: {
          username: I18n.t('settings.themes.sender'),
          id: 'otherUserId',
        },
      },
      {
        id: 'id',
        body: I18n.t('settings.themes.currentUserMessage'),
        date: '12:13',
        sender: {},
        isSender: true,
      }];
  }

  onItemSelect(index) {
    const selectedItem = data[index];
    const { theme } = selectedItem;

    storeKey('theme', theme);

    const [, dispatch] = this.context;

    dispatch({
      type: 'setProperty',
      key: 'theme',
      value: theme,
    });
  }

  renderListItem(info) {
    const [{ app }] = this.context;
    const selected = app.properties.theme === info.item.title;

    return (
      <ListItem
        index={info.index}
        title={info.item.title}
        onPress={(i) => this.onItemSelect(i)}
        selected={selected}
      />
    );
  }

  render() {
    const { themedStyle } = this.props;
    const { themes } = this.state;
    const [{ user }] = this.context;

    console.log('renderMessage', this.messages[0])
    return (
      <View style={themedStyle.container}>
        <Message message={this.messages[0]} current={user.current} />
        <Message message={this.messages[1]} current={user.current} />
        <List
          data={themes}
          renderItem={(i) => this.renderListItem(i)}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

ThemesContainer.contextType = StateContext;

export default withStyles(ThemesContainer, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}));
