import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withStyles, Text } from 'react-native-ui-kitten';
import moment from 'moment';
import Lesson from './Lesson';

class Day extends Component {
  static defaultProps = {
    day: {
      subject: [],
      date: 'none',
      dayName: 'none',
    },
  }

  renderAllSubjects() {
    const { day } = this.props;

    return day.subjects.slice(0).reverse().map((subject) => (
      <Lesson
        key={day.date + subject.time}
        subject={subject}
      />
    ));
  }

  render() {
    const { day, themedStyle } = this.props;
    const body = day.subjects.length > 0 ? this.renderAllSubjects() : null;
    const date = moment(day.date, 'DD.MM.YYYY').format('D MMMM');
    const week = moment(day.date, 'DD.MM.YYYY').format('dddd');
    const UppercaseWeek = week.charAt(0).toUpperCase() + week.slice(1);

    return (
      <View>
        <View style={themedStyle.titleWrapper}>
          <Text style={themedStyle.title}>{ `${UppercaseWeek}, ` }</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    paddingRight: 30,
    height: 25,
  },
  title: {
    paddingLeft: '0%',
    color: theme['color-basic-600'],
  },
  subtitle: {
    color: theme['color-basic-600'],
  },
  body: {
    width: '90%',
  },
}));

Day.propTypes = {
  day: PropTypes.shape({
    subjects: PropTypes.array,
    date: PropTypes.string,
    dayName: PropTypes.string,
  }),
};
