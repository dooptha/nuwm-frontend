import React, { Component } from 'react';
import { View } from 'react-native';
import { Tab, TabView, withStyles } from 'react-native-ui-kitten';
import moment from 'moment';
import I18n from '../../utils/i18n';
import Search from './Search';
import { getScheduleOnWeek } from '../../api/schedule';
import ScheduleList from './ScheduleList';

const mdata = [{
  date: '05.09.2018',
  dayName: 'Середа',
  day: 2,
  dayOfYear: 248,
  subjects: [{
    classroom: '441',
    group: 'ПМ-41, ІНФ-41',
    lecturer: 'Герус Володимир Андрійович',
    lesson: 2,
    name: 'Комп`ютерні мережі та їх адміністрування',
    time: '09:40-11:00',
    type: 'Лекція',
  },
  {
    classroom: '441',
    group: 'ПМ-41, ІНФ-41',
    lecturer: 'Герус Володимир Андрійович',
    lesson: 3,
    name: 'Комп`ютерні мережі та їх адміністрування',
    time: '11:00-12:20',
    type: 'Лекція',
  }],
},
{
  date: '06.09.2018',
  dayName: 'Середа',
  day: 2,
  dayOfYear: 248,
  subjects: [{
    classroom: '441',
    group: 'ПМ-41, ІНФ-41',
    lecturer: 'Герус Володимир Андрійович',
    lesson: 2,
    name: 'Комп`ютерні мережі та їх адміністрування',
    time: '09:40-11:00',
    type: 'Лекція',
  },
  {
    classroom: '441',
    group: 'ПМ-41, ІНФ-41',
    lecturer: 'Герус Володимир Андрійович',
    lesson: 3,
    name: 'Комп`ютерні мережі та їх адміністрування',
    time: '11:00-12:20',
    type: 'Лекція',
  }],
}];

export class Schedule extends Component {
  constructor(props) {
    super(props);

    this.currentDate = moment('2018-09-05 01:00:00');
  }

  state = {
    schedule: [],
    selectedIndex: 1,
    refreshing: false,
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
      day.date = moment(dateString, 'DD.MM.YYYY');

      day.subjects.forEach((subject) => {
        subject.momentTime = moment(`${dateString} ${subject.time.split('-')[0]}`, 'DD.MM.YYYY HH:mm');
      });
    });

    return data;
  }

  requestSchedule() {
    getScheduleOnWeek().then((data) => {
      this.setState({ refreshing: false, schedule: this.parseDates(mdata) });
    });
  }

  changeTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderSchedule(schedule, allowTimeline = false) {
    const { refreshing } = this.state;
    return (
      <ScheduleList
        refreshing={refreshing}
        allowTimeline={allowTimeline}
        allowRefresh
        onRefresh={() => this.onRefresh()}
        schedule={schedule}
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
