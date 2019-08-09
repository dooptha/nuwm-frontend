import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import Timeline from './Timeline';

import Day from './Day';
import I18n from '../../utils/i18n';

/**
  * This class responsible for rendering schedule list and it's logic
  * when there is no subjects or when refreshing list
*/
class ScheduleList extends Component {
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

  renderNoContentMessage() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.messageWrapper}>
        <Text style={themedStyle.messageText}>
          { I18n.t('timetable.no-lesson') }
        </Text>
      </View>
    );
  }

  renderSchedule(schedule, allowTimeline) {
    const { themedStyle } = this.props;

    const body = schedule.map((day) => (
      <Day key={day.date} day={day} allowTimeline />
    ));

    return body;
  }

  renderBody(schedule, allowTimeline) {
    return schedule.length > 0
      ? this.renderSchedule(schedule, allowTimeline)
      : this.renderNoContentMessage();
  }

  render() {
    const { navigation, themedStyle } = this.props;

    // schedule could be received by props or by navigation params
    const props = navigation ? navigation.state.params : this.props;

    const {
      allowRefresh, allowTimeline, refreshing, onRefresh, schedule,
    } = props;

    const refreshControl = allowRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
      />
    ) : null;

    // dont render anything while refreshing data
    const body = refreshing ? null : this.renderBody(schedule, allowTimeline);

    const timeline = schedule && schedule.length > 0 ? <Timeline schedule={schedule} /> : null;

    return (
      <View style={themedStyle.row}>
        <ScrollView
          contentContainerStyle={themedStyle.listWrapper}
          refreshControl={refreshControl}
        >
          { timeline }
          <View style={themedStyle.body}>
            { body }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(ScheduleList, (theme) => ({
  listWrapper: {
    backgroundColor: theme['background-basic-color-1'],
    height: '100%',
    flexDirection: 'row',
  },
  messageText: {
    color: theme['text-basic-color'],
  },
  messageWrapper: {
    marginTop: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '90%',
  },
  row: {
    borderTopColor: theme['color-basic-400'],
    borderTopWidth: 1,
  },
}));
