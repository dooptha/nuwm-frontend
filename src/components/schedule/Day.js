import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import moment from 'moment';
import Lesson from './Lesson';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAllSubjects() {
    const { day } = this.props;

    return day.subjects.map((subject) => (
      <Lesson
        key={subject.day}
        subject={subject}
      />
    ));
  }

  render() {
    const { day, themedStyle } = this.props;
    const body = day.subjects.length > 0 ? this.renderAllSubjects() : null;
    const date = moment(day.date).format('D MMMM');

    return (
      <View>
        <View style={themedStyle.titleWrapper}>
          <Text style={themedStyle.title}>{ day.dayName }</Text>
          <Text style={themedStyle.subtitle}>{ date }</Text>
        </View>
        <View style={themedStyle.body}>
          { body }
        </View>
      </View>
    );
  }
}

export default withStyles(Day, (theme) => ({
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    paddingLeft: '5%',
  },
  subtitle: {
    paddingRight: '4%',
    color: theme['text-hint-color'],
  },
  body: {
    marginLeft: 15,
  },
}));
