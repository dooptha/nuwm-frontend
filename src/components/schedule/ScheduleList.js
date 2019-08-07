import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';

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
    /** if RefreshControl feature is enabled */
    allowRefresh: PropTypes.bool,
    /** callback for RefreshControl */
    onRefresh: PropTypes.func,
    /** if RefreshControl is active */
    refreshing: false,
  }

  static defaultProps = {
    schedule: [],
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

  renderSchedule(schedule) {
    return schedule.length > 0
      ? schedule.map((day) => (
        <Day key={day.date} day={day} />
      )) : this.renderNoContentMessage();
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
    const body = refreshing ? null : this.renderSchedule(schedule);

    return (
      <ScrollView
        style={themedStyle.listWrapper}
        refreshControl={refreshControl}
      >
        { body }
      </ScrollView>
    );
  }
}

export default withStyles(ScheduleList, (theme) => ({
  listWrapper: {
    backgroundColor: theme['background-basic-color-2'],
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
}));
