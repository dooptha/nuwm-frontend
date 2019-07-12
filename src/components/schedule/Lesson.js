import React, { Component } from 'react';
import { ListItem } from 'react-native-ui-kitten';
import { View } from 'react-native';
import NavigationService from '../../navigation/NavigationService';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress() {
    const { subject } = this.props;
    NavigationService.navigate('DetailedLesson',
      { subject });
  }

  render() {
    const {
      classroom,
      /* lecturer,
      subgroup,
      streams_type,
      lessonNum, */
      time,
      /* type, */
      name,
    } = this.props.subject;

    return (
      <View>
        <ListItem
          title={`(${classroom}) ${name}`}
          description={time}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }
}
