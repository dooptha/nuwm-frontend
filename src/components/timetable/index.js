import React, { Component } from 'react';
import { ScrollView, RefreshControl, Dimensions } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
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
    index: 0,
    routes: [
      { key: 'first', title: I18n.t('timetable.tabs.Search') },
      { key: 'second', title: I18n.t('timetable.tabs.Today') },
      { key: 'third', title: I18n.t('timetable.tabs.Tomorrow') },
      { key: 'fourth', title: I18n.t('timetable.tabs.Week') },
    ],
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

  renderScene = ({ route }) => {
    const { data } = this.state;
    const schedule = replaceDatesWithMomentObjects(data);

    const today = schedule.filter((day) => isToday(day.date));
    const tomorrow = schedule.filter((day) => isTomorrow(day.date));
    const week = schedule.slice(0);

    switch (route.key) {
      case 'first':
        return <Search />;
      case 'second':
        return this.renderSchedule(today, 1);
      case 'third':
        return this.renderSchedule(tomorrow, 2);
      case 'fourth':
        return this.renderSchedule(week, 3);
      default:
        return null;
    }
  };


  render() {
    const { props: { themedStyle }, state: { selectedIndex } } = this;

    return (
      <TabView
        renderTabBar={(props) => (
          <TabBar
            style={themedStyle.tabBar}
            labelStyle={themedStyle.tabBarLabel}
            indicatorStyle={themedStyle.tabBarIndicator}
            {...props}
            activeColor={themedStyle.activeColor.color}
            inactiveColor={themedStyle.inactiveColor.color}
          />
        )}
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={(index) => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

export default withStyles(Timetable, (theme) => ({
  activeColor: {
    color: theme['background-primary-color-1'],
  },
  inactiveColor: {
    color: theme['text-hint-color'],
  },
  tabBarLabel: {
    fontWeight: 'bold',
    width: 'auto',
    textTransform: 'capitalize',
  },
  tabBarIndicator: {
    backgroundColor: theme['background-primary-color-1'],
  },
  tabBar: {
    height: 40,
    marginTop: -10,
    backgroundColor: theme['background-basic-color-1'],
  },
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
