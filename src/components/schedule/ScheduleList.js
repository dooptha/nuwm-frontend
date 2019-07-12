import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import Day from './Day';

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNoContentMessage() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.messageWrapper}>
        <Text style={themedStyle.messageText}>
          Нема пар, можна в батлу
        </Text>
      </View>
    );
  }

  renderSchedule() {
    const { schedule, refreshing } = this.props;

    const message = refreshing ? null : this.renderNoContentMessage();

    return schedule.length > 0
      ? schedule.map((day) => (
        <Day key={day.date} day={day} />
      )) : message;
  }

  render() {
    const { refreshing, onRefresh } = this.props;

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
