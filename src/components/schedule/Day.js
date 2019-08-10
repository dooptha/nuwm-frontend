import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withStyles, Text } from 'react-native-ui-kitten';
import Lesson from './Lesson';

/**
  * Displays information for one day: date and it's lessons
*/
class Day extends Component {
  static propTypes = {
    day: PropTypes.shape({
      subjects: PropTypes.array,
      dayName: PropTypes.string,
    }),
  }

  static defaultProps = {
    day: {
      subject: [],
      dayName: 'none',
    },
  }

  getDateLabel(moment) {
    const date = moment.format('D MMMM');
    const week = moment.format('dddd');

    return `${week.charAt(0).toUpperCase() + week.slice(1)}, ${date}`;
  }

  renderAllSubjects() {
    const { day } = this.props;

    return day.subjects.map((subject, index) => (
      <Lesson
        key={subject.time + day.dayOfYear}
        subject={subject}
        isLastItem={day.subjects.length - 1 === index}
      />
    ));
  }

  render() {
    const { day, themedStyle } = this.props;
    const body = day.subjects.length > 0 ? this.renderAllSubjects() : null;

    const date = this.getDateLabel(day.date);

    return (
      <View>
        <View style={themedStyle.titleWrapper}>
          <Text style={themedStyle.title}>{ date }</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    paddingRight: 30,
    height: 25,
  },
  title: {
    paddingLeft: 8,
    color: theme['text-basic-color'],
  },
  body: {
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    width: '90%',
  },
}));
