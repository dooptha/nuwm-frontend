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
import { isToday, isTomorrow, replaceDatesWithMoment } from './helper';

export class Timetable extends Component {
  static contextType = StateContext;

  state = {
    data: [],
    schedule: [],
    today: [],
    tomorrow: [],
    language: '',
    refreshing: false,
    error: false,
    index: 3,
    routes: [

    ],
  };

  componentDidMount() {
    this.requestSchedule();
  }

  onRefresh() {
    this.requestSchedule();
  }

  splitSchedule(props = {}) {
    console.log('UPD');
    const schedule = replaceDatesWithMoment(props.data || this.state.data);

    const today = schedule.filter((day) => isToday(day.date));
    const tomorrow = schedule.filter((day) => isTomorrow(day.date));

    this.setState({
      ...props, today, tomorrow, schedule,
    });
  }

  requestSchedule() {
    this.setState({ refreshing: true });

    getScheduleOnWeek()
      .then((resData) => {
        const newState = { refreshing: false };

        if (resData.error || resData.length === 0) {
          getKey('timetable').then((rawData) => {
            const data = rawData ? JSON.parse(rawData) : [];
            this.splitSchedule({
              ...newState,
              data,
              error: resData.error,
            });
          });
        } else {
          storeKey('timetable', JSON.stringify(resData));
          this.splitSchedule({
            ...newState,
            data: resData,
          });
        }
      })
      .catch((err) => console.log({ err }));
  }

  renderSchedule(schedule, tabIndex) {
    const { refreshing, error, index } = this.state;
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
          schedule={schedule}
          message={error}
          tabIndex={tabIndex}
          activeTab={index}
        />
      </ScrollView>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'search':
        return <Search />;
      case 'today':
        return this.renderSchedule(this.state.today, 1);
      case 'tomorrow':
        return this.renderSchedule(this.state.tomorrow, 2);
      case 'week':
        return this.renderSchedule(this.state.schedule, 3);
      default:
        return null;
    }
  };

  updateLocales() {
    if (this.state.language !== this.context[0].app.properties.language) {
      const routes = [
        { key: 'search', title: I18n.t('timetable.tabs.Search') },
        { key: 'today', title: I18n.t('timetable.tabs.Today') },
        { key: 'tomorrow', title: I18n.t('timetable.tabs.Tomorrow') },
        { key: 'week', title: I18n.t('timetable.tabs.Week') },
      ];
      this.splitSchedule({ routes, language: this.context[0].app.properties.language });
    }
  }

  render() {
    const { props: { themedStyle } } = this;

    this.updateLocales();

    console.log('rerender');

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
