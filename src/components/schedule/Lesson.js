import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-ui-kitten';
import { View } from 'react-native';
import NavigationService from '../../navigation/NavigationService';

export default class Lesson extends Component {
  static defaultProps = {
    subject: {
      classroom: '-',
      time: '-',
      name: '-',
    },
  }

  onPress() {
    const { subject } = this.props;
    NavigationService.navigate('DetailedLesson',
      { subject });
  }

  render() {
    const {
      subject: {
        classroom,
        /* lecturer,
        subgroup,
        streams_type,
        lessonNum, */
        time,
        /* type, */
        name,
      },
    } = this.props;

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

Lesson.propTypes = {
  subject: PropTypes.shape({
    classroom: PropTypes.string,
    time: PropTypes.string,
    name: PropTypes.string,
  }),
};
