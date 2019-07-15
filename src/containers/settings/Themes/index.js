import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  ListItem,
  withStyles,
} from 'react-native-ui-kitten';
import { Message } from '../../../components/conversations';
import data from './data';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';

class ThemesContainer extends Component {
  constructor(props) {
    super(props);

    this.data = data;

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

    this.onItemSelect = this.onItemSelect.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];
    this.updateTheme(selectedItem.theme);
  }

  updateTheme(value) {
    storeKey('theme', value);

    const [, dispatch] = this.context;

    dispatch({
      type: 'setProperty',
      key: 'theme',
      value,
    });
  }

  renderListItem(info) {
    return (
      <ListItem
        title={info.item.title}
        onPress={this.onItemSelect}
      />
    );
  }

  render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <Message message={this.messages[0]} />
        <Message message={this.messages[1]} />
        <List
          data={this.data}
          renderItem={this.renderListItem}
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
