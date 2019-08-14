import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import Timeline from './timeline';

import Day from './Day';

import InlineError from '../common/InlineError';

/**
  * This class responsible for rendering schedule list and it's logic
  * when there is no subjects or when refreshing list
*/
class Schedule extends Component {
  static propTypes = {
    /** array of days with subjects */
    schedule: PropTypes.array,
    /** if Timeline is enabled */
    allowTimeline: PropTypes.bool,
    /** if RefreshControl feature is enabled */
    allowRefresh: PropTypes.bool,
    /** callback for RefreshControl */
    onRefresh: PropTypes.func,
    /** if RefreshControl is active */
    refreshing: PropTypes.bool,
  }

  static defaultProps = {
    schedule: [],
    allowTimeline: false,
    allowRefresh: false,
    onRefresh: () => console.warn('Unpredictable callback from Schedule List'),
    refreshing: false,
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
    const { themedStyle } = this.props;

    const body = schedule.map((day) => (
      <Day key={day.date} day={day} />
    ));

    return (
      <View style={themedStyle.row}>
        <Timeline
          schedule={schedule}
          style={themedStyle.timeline}
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
    const { navigation, themedStyle } = this.props;

    // schedule could be received by props or by navigation params
    const props = navigation ? navigation.state.params : this.props;
    const { refreshing, schedule, message } = props;

    // dont render anything while refreshing data
    const body = refreshing ? null : this.renderBody(schedule, message);

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
  timeline: {
    width: '10%',
    marginLeft: '0%',
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
