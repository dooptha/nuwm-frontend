import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';
import I18n from '../../core/localization';

export class ThemesList extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;

    this.renderItem = (info) => {
      return (
        <ListItem
          title={info.item.title + (info.item.selected? ' selected' : '')}
          onPress={(i) => props.onItemSelect(i)}
        />
      );
    };
  }

  render() {
    return (
      <View>
      <List
        data={this.data}
        renderItem={this.renderItem}
      />
      </View>
    );
  }
};