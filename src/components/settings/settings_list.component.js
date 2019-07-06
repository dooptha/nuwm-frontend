import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

export class SettingsList extends Component {
  constructor(props) {
    super(props);

    console.log(props.data)

    this.data = props.data;

    this.renderItem = (info) => {
      return (
        <ListItem
          title={info.item.title}
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
