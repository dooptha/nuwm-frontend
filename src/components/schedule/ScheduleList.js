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
    const body = schedule.map((day) => (
      <Day key={day.date} day={day} />
    ));

    return body;
  }

  renderBody(schedule, mes) {
    return schedule.length > 0
      ? this.renderSchedule(schedule) : this.renderMessage(mes);
  }

  render() {
    const { navigation, themedStyle } = this.props;

    // schedule could be received by props or by navigation params
    const props = navigation ? navigation.state.params : this.props;

    const {
      allowRefresh, refreshing, onRefresh, schedule,
    } = props;

    const refreshControl = allowRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
      />
    ) : null;

    // dont render anything while refreshing data
    const body = refreshing ? null : this.renderBody(schedule, props.message);

    const timeline = schedule && schedule.length > 0 && !refreshing
      ? <Timeline schedule={schedule} /> : null;

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
    flexDirection: 'row',
    minHeight: '100%',
  },
  messageText: {
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: '40%',
    textAlign: 'center',
    color: theme['text-basic-color'],
  },
  messageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '100%',
    paddingRight: '5%',
    paddingBottom: 30,
  },
  row: {
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
  },
}));
