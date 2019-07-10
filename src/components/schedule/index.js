import React, { Component } from 'react';
import axios from 'axios';
import {
  Tab, Text, TabView, withStyles,
} from 'react-native-ui-kitten';

import Day from './Day';
import Search from './Search';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    const group = 'ПМ-41';
    const startDate = '01.09.2017';
    const endDate = '31.12.2018';

    axios.get('http://localhost:3000/', { params: { group, endDate, startDate } })
      .then((data) => {
        this.setState({ schedule: data.data.body.response.schedule });
      })
      .catch((err) => console.log(err));
  }

  onIndexChange(index) {
    this.setState({ selectedIndex: index });
  }

  changeTab(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { themedStyle } = this.props;
    const { schedule, selectedIndex } = this.state;

    return (
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => this.changeTab(index)}
        style={themedStyle.tabViewContainer}
      >
        <Tab title="Пошук">
          <Search />
        </Tab>
        <Tab title="Сьогодні">
          {schedule.length > 1 ? <Day day={schedule[1]} /> : null }
        </Tab>
        <Tab title="Завтра">
          <Text>Tab 2</Text>
        </Tab>
        <Tab title="Тиждень">
          <Text>Tab 3</Text>
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
