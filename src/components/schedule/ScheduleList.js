import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import Day from './Day';
import I18n from '../../utils/i18n';

class ScheduleList extends Component {
  static defaultProps = {
    refreshing: false,
    onRefresh: () => {},
    schedule: [],
    navigation: {
      state: {
        params: {
          schedule: [],
        },
      },
    },
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
    const { props, props: { navigation } } = this;

    // schedule could be passed by props or by navigation
    if (props.schedule.length > 0) {
      const { refreshing, onRefresh, schedule } = this.props;
      return this.renderList({ refreshing, onRefresh, schedule });
    }
    const { refreshing, onRefresh, schedule } = navigation.state.params;
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

ScheduleList.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  schedule: PropTypes.array,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        schedule: PropTypes.array,
      }),
    }),
  }),
};
