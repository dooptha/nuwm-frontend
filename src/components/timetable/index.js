import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Tab, TabView, withStyles } from 'react-native-ui-kitten';
import Search from './search';
import Schedule from './Schedule';

import I18n from '../../utils/i18n';
import { getScheduleOnWeek } from '../../api/timetable';
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
    this.requestSchedule();
  }

  requestSchedule() {
    this.setState({ refreshing: true });

    getScheduleOnWeek()
      .then((resData) => {
        const newState = { refreshing: false };

        if (resData.error || resData.length === 0) {
          getKey('timetable').then((rawData) => {
            const data = rawData ? JSON.parse(rawData) : [];
            this.setState({ ...newState, data, error: resData.error });
          });
        } else {
          storeKey('timetable', JSON.stringify(resData));
          this.setState({ ...newState, data: resData });
        }
      })
      .catch((err) => console.log({ err }));
  }

  switchTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderSchedule(schedule, index) {
    const { refreshing, error, selectedIndex } = this.state;
    const { themedStyle } = this.props;

    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => this.onRefresh()}
      />
    );

    return (
      <ScrollView
        style={themedStyle.scrollContainer}
        contentContainerStyle={themedStyle.scroll}
        refreshControl={refreshControl}
      >
        <Schedule
          refreshing={refreshing}
          allowRefresh
          schedule={schedule}
          message={error}
          tabIndex={index}
          activeTab={selectedIndex}
        />
      </ScrollView>
    );
  }

  render() {
    const { props: { themedStyle }, state: { data, selectedIndex } } = this;

    const schedule = replaceDatesWithMomentObjects(data);

    const today = schedule.filter((day) => isToday(day.date));
    const tomorrow = schedule.filter((day) => isTomorrow(day.date));
    const week = schedule.slice(0);

    return (
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => this.switchTab(index)}
        style={themedStyle.tabView}
      >
        <Tab title={I18n.t('timetable.tabs.Search')}>
          <Search />
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Today')}>
          { this.renderSchedule(today, 1) }
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Tomorrow')}>
          { this.renderSchedule(tomorrow, 2) }
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Week')}>
          { this.renderSchedule(week, 3) }
        </Tab>
      </TabView>
    );
  }
}

export default withStyles(Timetable, (theme) => ({
  tabView: {
    height: '100%',
    backgroundColor: theme['background-basic-color-1'],
  },
  scroll: {
    flexDirection: 'row',
    minHeight: '100%',
  },
  scrollContainer: {
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
  },
}));
