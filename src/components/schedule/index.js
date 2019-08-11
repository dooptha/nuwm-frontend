import React, { Component } from 'react';
import { View } from 'react-native';
import { Tab, TabView, withStyles } from 'react-native-ui-kitten';
import moment from 'moment';
import I18n from '../../utils/i18n';
import Search from './Search';
import { getScheduleOnWeek } from '../../api/schedule';
import ScheduleList from './ScheduleList';
import { storeKey, getKey, removeKey } from '../../utils/storage';

export class Schedule extends Component {
  constructor(props) {
    super(props);

    this.currentDate = moment('2018-09-05 01:00:00');
  }

  state = {
    schedule: [],
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

  parseDates(data) {
    data.forEach((day) => {
      const dateString = day.date;
      if (!moment.isMoment(day.date)) {
        day.date = moment(dateString, 'DD.MM.YYYY');
      }

      day.subjects.forEach((subject) => {
        if (!moment.isMoment(subject.momentTime)) {
          subject.momentTime = moment(
            `${dateString} ${subject.time.split('-')[0]}`,
            'DD.MM.YYYY HH:mm',
          );
        }
      });
    });

    return data;
  }

  manageData(res) {
    if (res.error || res.length === 0) {
      getKey('timetable').then((schedule) => {
        const data = schedule ? this.parseDates(JSON.parse(schedule)) : [];
        this.setState({ refreshing: false, schedule: data, error: res.error });
      });
    } else {
      storeKey('timetable', JSON.stringify(res));
      this.setState({ refreshing: false, schedule: this.parseDates(res) });
    }
  }

  requestSchedule() {
    getScheduleOnWeek()
      .then((res) => this.manageData(res))
      .catch((err) => console.log({ err }));
  }

  changeTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderSchedule(schedule, allowTimeline = false) {
    const { refreshing, error } = this.state;

    return (
      <ScheduleList
        refreshing={refreshing}
        allowTimeline={allowTimeline}
        allowRefresh
        onRefresh={() => this.onRefresh()}
        schedule={schedule}
        message={error}
      />
    );
  }

  render() {
    const { props: { themedStyle }, state: { schedule, selectedIndex } } = this;

    const today = schedule.filter((day) => day.date.isSame(this.currentDate, 'day'));
    const tomorrow = schedule.filter((day) => day.date.isSame(this.currentDate.clone().add(1, 'day'), 'day'));

    return (
      <View>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => this.changeTab(index)}
          style={themedStyle.tabViewContainer}
        >
          <Tab title={I18n.t('timetable.tabs.Search')}>
            <Search />
          </Tab>
          <Tab title={I18n.t('timetable.tabs.Today')}>
            { this.renderSchedule(today, true) }
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

export default withStyles(Schedule, (theme) => ({
  tabViewContainer: {
    height: '100%',
    backgroundColor: theme['background-basic-color-1'],
  },
}));
