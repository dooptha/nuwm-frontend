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

  state = {
    scheduleKey: -2,
  }

  static defaultProps = {
    day: {
      subject: [],
      dayName: 'none',
    },
  }

  constructor(props) {
    super(props);

    this.lessons = [];
  }

  shouldComponentUpdate(nextProps) {
    const { scheduleKey } = this.state;

    if (nextProps.scheduleKey !== scheduleKey) {
      this.setState({ scheduleKey: nextProps.scheduleKey });
      this.lessons = [];
    }

    return true;
  }

  getDateLabel(moment) {
    const date = moment.format('D MMMM');
    const week = moment.format('dddd');

    return `${week.charAt(0).toUpperCase() + week.slice(1)}, ${date}`;
  }

  watchLessons(lesson, subjectIndex) {
    const { index, day, watchDays } = this.props;

    this.lessons[subjectIndex] = lesson;

    for (let i = 0; i < day.subjects.length; i += 1) {
      if (!this.lessons[i]) {
        return;
      }
    }

    watchDays(this.lessons, index);
  }

  renderAllSubjects() {
    const { day } = this.props;

    return day.subjects.map((subject, index) => {
      let showTime = true;

      if (index > 0) {
        if (day.subjects[index - 1].time === subject.time) {
          showTime = false;
        }
      }

      return (
        <Lesson
          index={index}
          watchLessons={(lesson, i) => this.watchLessons(lesson, i)}
          hasDate={index === 0}
          showTime={showTime}
          key={day.dayOfYear + subject.time + subject.name + subject.group}
          subject={subject}
          isLastItem={day.subjects.length - 1 === index}
        />
      );
    });
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
    height: 25,
  },
  title: {
    fontWeight: 'bold',
    color: theme['text-basic-color'],
  },
  body: {
    borderRightColor: theme['background-basic-color-3'],
    borderRightWidth: 1,
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 3,
  },
}));
