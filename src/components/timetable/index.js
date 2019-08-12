import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Tab, TabView, withStyles } from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';
import Search from './search';
import { getScheduleOnWeek } from '../../api/schedule';
import Schedule from './Schedule';
import { storeKey, getKey } from '../../utils/storage';
import { StateContext } from '../../utils/context';

import { isToday, isTomorrow, replaceDatesWithMomentObjects } from './helper';

export class Timetable extends Component {
  static contextType = StateContext;

  state = {
    data: [],
    selectedIndex: 3,
    refreshing: false,
    error: false,
  };

  componentDidMount() {
    this.requestSchedule();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.requestSchedule();
  }

  requestSchedule() {
    getScheduleOnWeek()
      .then((resData) => {
        let newState = { refreshing: false };

        if (resData.error || resData.length === 0) {
          getKey('timetable').then((rawData) => {
            const data = rawData ? this.parseDates(JSON.parse(rawData)) : [];
            newState = { ...newState, data, error: resData.error };
          });
        } else {
          storeKey('timetable', JSON.stringify(resData));
          newState = { ...newState, data: resData };
        }

        this.setState(newState);
      })
      .catch((err) => console.log({ err }));
  }

  switchTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderSchedule(schedule) {
    const { refreshing, error } = this.state;
    const { themedStyle } = this.props;

    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => this.onRefresh()}
      />
    );

    return (
      <ScrollView
        contentContainerStyle={themedStyle.listWrapper}
        refreshControl={refreshControl}
      >
        <Schedule
          refreshing={refreshing}
          allowRefresh
          schedule={schedule}
          message={error}
        />
      </ScrollView>
    );
  }

  render() {
    const { props: { themedStyle }, state: { data, selectedIndex } } = this;

    const schedule = replaceDatesWithMomentObjects(data);

    const today = schedule.filter((day) => isToday(day.date));
    const tomorrow = schedule.filter((day) => isTomorrow(day.date));

    return (
      <View>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => this.switchTab(index)}
          style={themedStyle.tabViewContainer}
        >
          <Tab title={I18n.t('timetable.tabs.Search')}>
            <Search />
          </Tab>
          <Tab title={I18n.t('timetable.tabs.Today')}>
            { this.renderSchedule(today) }
          </Tab>
          <Tab title={I18n.t('timetable.tabs.Tomorrow')}>
            { this.renderSchedule(tomorrow) }
          </Tab>
          <Tab title={I18n.t('timetable.tabs.Week')}>
            { this.renderSchedule(schedule) }
          </Tab>
        </TabView>
      </View>
    );
  }
}

export default withStyles(Timetable, (theme) => ({
  tabViewContainer: {
    height: '100%',
    backgroundColor: theme['background-basic-color-1'],
  },
}));
