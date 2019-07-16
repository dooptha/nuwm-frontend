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

class ThemesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: data,
    };

    this.messages = [
      {
        body: 'Колись мені сказали',
        date: '13:00',
        sender: false,
      },
      {
        body: 'Що світ мене роздавить',
        date: '13:02',
        sender: true,
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
    const [context] = this.context;
    const selected = context.properties.theme === info.item.title;

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

    return (
      <View style={themedStyle.container}>
        <Message message={this.messages[0]} />
        <Message message={this.messages[1]} />
        <List
          data={themes}
          renderItem={(i) => this.renderListItem(i)}
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
