import React, { Component } from 'react';
import axios from 'axios';
import {
  Tab, Text, TabView, withStyles,
} from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';
import Day from './Day';
import Search from './Search';
import Api from '../../api/schedule';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      selectedIndex: 1,
      fetchingData: true,
    };
  }

  componentDidMount() {
    Api.getScheduleOnWeek().then((data) => {
      console.log(data);
      this.setState({ fetchingData: false, schedule: data });
    });
  }

  changeTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderWeek() {
    const { schedule } = this.state;

    return schedule.map((day) => (
      <Day key={day.date} day={day} />
    ));
  }

  render() {
    const { themedStyle } = this.props;
    const { schedule, selectedIndex } = this.state;

    const today = schedule.filter((day) => day.date === '04.09.2018')[0];
    const tomorrow = schedule.filter((day) => day.date === '05.09.2018')[0];

    return (
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => this.changeTab(index)}
        style={themedStyle.tabViewContainer}
      >
        <Tab title={I18n.t('timetable.tabs.Search')}>
          <Search />
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Today')}>
          {today ? <Day day={today} /> : null }
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Tomorrow')}>
          {tomorrow ? <Day day={tomorrow} /> : null }
        </Tab>
        <Tab title={I18n.t('timetable.tabs.Week')}>
          { schedule.length > 0 ? this.renderWeek() : null}
        </Tab>
      </TabView>
    );
  }
}

export default withStyles(Schedule, (theme) => ({
  tabViewContainer: {
    height: '100%',
    backgroundColor: theme['background-basic-color-2'],
  },
}));
