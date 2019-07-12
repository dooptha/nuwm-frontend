import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';
import Day from './Day';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSchedule() {
    const { schedule } = this.props;

    return schedule.length > 0
      ? schedule.map((day) => (
        <Day key={day.date} day={day} />
      )) : null;
  }

  render() {
    const { themedStyle, refreshing, onRefresh } = this.props;

    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        )}
      >
        { this.renderSchedule() }
      </ScrollView>
    );
  }
}

export default withStyles(ScheduleList, (theme) => ({
}));
