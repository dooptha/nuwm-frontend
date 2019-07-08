import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';
import I18n from '../../core/localization';
import { Message } from './message.component';

export class Conversation extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;

    this.renderItem = (info) => {
      return (
        <ListItem
          title={info.item.body}
          onPress={(i) => props.onItemSelect(i)}
        />
      );
    };
  }

  renderMessage(info) {
  const { themedStyle } = this.props;

  return (
    <Message
      index={info.index}
      message={info.item}
    />
  );
};

  render() {
    return (
      <List
        data={this.data}
        renderItem={(info) => this.renderMessage(info)}
      />
    );
  }
};
