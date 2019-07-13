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

  renderSchedule(refreshing, schedule) {
    const message = refreshing ? null : this.renderNoContentMessage();

    return schedule.length > 0
      ? schedule.map((day) => (
        <Day key={day.date} day={day} />
      )) : message;
  }

  renderList(props) {
    const {
      refreshing, onRefresh, schedule,
    } = props;
    const { themedStyle } = this.props;
    return (
      <ScrollView
        style={themedStyle.listWrapper}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        )}
      >
        { this.renderSchedule(refreshing, schedule) }
      </ScrollView>
    );
  }

  render() {
    console.log(this.props);

    if (this.props.schedule) {
      const { refreshing, onRefresh, schedule } = this.props;
      return this.renderList({ refreshing, onRefresh, schedule });
    }
    const { refreshing, onRefresh, schedule } = this.props.navigation.state.params;
    return this.renderList({ refreshing, onRefresh, schedule });
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
