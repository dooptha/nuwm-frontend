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
  static defaultProps = {
    schedule: [],
    onRefresh: () => console.warn('Unpredictable callback from Schedule List'),
  }

  componentDidMount() {
    if (this.timeline) {
      this.timeline.startAnimation();
    }
  }

  shouldComponentUpdate() {
    if (this.timeline) {
      this.timeline.resetAnimation();
    }

    return true;
  }

  componentDidUpdate() {
    const { active } = this.props;
    if (this.timeline && active) {
      this.timeline.startAnimation();
    }
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

    const body = schedule.map((day) => (
      <Day key={day.date} day={day} />
    ));

    return (
      <View style={themedStyle.row}>
        <Timeline
          schedule={schedule}
          style={themedStyle.timeline}
          active={active}
          activeColor={themedStyle.colors.active}
          inactiveColor={themedStyle.colors.inactive}
          ref={(node) => this.timeline = node}
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
