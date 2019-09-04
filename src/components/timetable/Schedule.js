import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import Timeline from './timeline';

import Day from './Day';

/**
  * This class responsible for rendering schedule list and it's logic
  * when there is no subjects or when refreshing list
*/
class Schedule extends Component {
  state = {
    scheduleKey: new Date().getTime(),
  }

  static defaultProps = {
    schedule: [],
    onRefresh: () => console.warn('Unpredictable callback from Schedule List'),
  }

  constructor(props) {
    super(props);

    // here we will store all lessons, after getting their sizes
    this.lessons = [];
  }

  shouldComponentUpdate(nextProps) {
    const { active } = nextProps;
    const { scheduleKey } = this.state;

    if (this.timeline) {
      if (active) this.timeline.startAnimation();
      else {
        this.timeline.resetTimer();
        this.timeline.resetAnimation();
      }
    }

    // dont rerender or update list, if get the same schedule
    // js cant compare object, so we compare custom key parameter
    if (nextProps.scheduleKey !== scheduleKey) {
      this.lessons = [];
      this.setState({ scheduleKey: nextProps.scheduleKey });
    }

    return true;
  }

  watchForLessonsSizes(lessons, index) {
    const { schedule } = this.props;
    let concatedLessons = [];
    this.lessons[index] = lessons;
    const len = schedule.length;

    for (let i = 0; i < len; i += 1) {
      if (!this.lessons[i]) return;
    }

    for (let i = 0; i < len; i += 1) {
      concatedLessons = concatedLessons.concat(this.lessons[i]);
    }

    this.timeline.updateData(schedule[0].date, schedule[len - 1].date, concatedLessons);
  }

  renderMessage(message) {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.messageWrapper}>
        <Text style={themedStyle.messageText}>
          { message }
        </Text>
      </View>
    );
  }

  renderSchedule(schedule) {
    const { themedStyle, active } = this.props;

    const body = schedule.map((day, dayIndex) => (
      <Day
        key={day.date}
        index={dayIndex}
        day={day}
        watchDays={(lessons, index) => this.watchForLessonsSizes(lessons, index)}
      />
    ));

    return (
      <View style={themedStyle.row}>
        <Timeline
          schedule={schedule}
          style={themedStyle.timeline}
          active={active}
          activeColor={themedStyle.colors.active}
          inactiveColor={themedStyle.colors.inactive}
          ref={(node) => { this.timeline = node; }}
        />
        <View style={themedStyle.days}>
          { body }
        </View>
      </View>
    );
  }

  renderBody(schedule, mes) {
    return schedule.length > 0
      ? this.renderSchedule(schedule) : this.renderMessage(mes);
  }

  render() {
    const { themedStyle, schedule, message } = this.props;
    const body = this.renderBody(schedule, message);

    return (
      <View style={themedStyle.wrapper}>
        { body }
      </View>
    );
  }
}

export default withStyles(Schedule, (theme) => ({
  wrapper: {
    backgroundColor: theme['background-basic-color-1'],
    width: '100%',
    minHeight: '100%',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
  },
  days: {
    width: '90%',
    paddingLeft: 5,
    paddingRight: 15,
  },
  colors: {
    active: theme['background-primary-color-1'],
    inactive: theme['border-basic-color-5'],
  },
  messageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: '40%',
    textAlign: 'center',
    color: theme['text-basic-color'],
  },
}));
