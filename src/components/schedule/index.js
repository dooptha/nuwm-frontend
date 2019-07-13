import React, { Component } from 'react';
import { View } from 'react-native';
import { Tab, TabView, withStyles } from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';
import Search from './Search';
import Api from '../../api/schedule';
import ScheduleList from './ScheduleList';

class Schedule extends Component {
  state = {
    schedule: [],
    selectedIndex: 3,
    refreshing: false,
  };

  componentDidMount() {
    this.requestSchedule();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.requestSchedule();
  }

  requestSchedule() {
    Api.getScheduleOnWeek().then((data) => {
      this.setState({ refreshing: false, schedule: data });
    });
  }

  changeTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderSchedule(schedule) {
    const { refreshing } = this.state;
    return (
      <ScheduleList
        refreshing={refreshing}
        onRefresh={() => this.onRefresh()}
        schedule={schedule}
      />
    );
  }

  render() {
    const { themedStyle } = this.props;
    const { schedule, selectedIndex } = this.state;

    console.log(schedule);

    const today = schedule.filter((day) => day.date === '04.09.2018');
    const tomorrow = schedule.filter((day) => day.date === '05.09.2018');

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

export default withStyles(Schedule, (theme) => ({
  tabViewContainer: {
    height: '100%',
    backgroundColor: theme['background-basic-color-2'],
  },
}));
