import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
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

    return (
      <View>
        <Text style={themedStyle.title}>{ day.dayName }</Text>
        <View style={themedStyle.body}>
          { body }
        </View>
      </View>
    );
  }
}

export default withStyles(Day, (theme) => ({
  title: {
    paddingLeft: '5%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  body: {
    marginLeft: 15,
  },
}));
