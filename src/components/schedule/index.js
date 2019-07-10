import React, { Component } from 'react'
import { View } from 'react-native'

import { TopNavigationAction, Tab, Text, TabView, withStyles } from 'react-native-ui-kitten'
import axios from 'axios'

import Day from './Day'
import { Search } from './Search'

class ScheduleComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultGroup: 'ПМ-41',
      schedule: [],
      selectedIndex: 0
    }
  }

  componentDidMount () {
    let group = 'ПМ-41'
    let startDate = '01.09.2017'
    let endDate = '31.12.2018'

    axios.get('http://localhost:3000/', { params: { group, endDate, startDate } })
      .then(data => {
        this.setState({ schedule: data.data.body.response.schedule })

        console.log(this.state.schedule)
      })
      .catch(err => console.log(err))
  }

  getTodaySchedule () {
    /*  Api.getSchedule({
      group: this.state.defaultGroup,
      startDate: this.startDate.state.date,
      endDate: this.endDate.state.date,
    }).then((data) => {
      console.log('here')
      console.log(data);
    }); */
  }

  onPress () {

    /*  Api.getSchedule({
      group: this.state.defaultGroup,
      startDate: this.startDate.state.date,
      endDate: this.endDate.state.date,
    }).then((data) => {
      console.log('here')
      console.log(data);
    }); */
  }

  renderRightControl () {
    return (
      <TopNavigationAction
        title='Tomorrow'
      />
    )
  }

  onIndexChange (index) {
    this.setState({ selectedIndex: index })
  }

  changeTab (index) {
    this.setState({ selectedIndex: index })
  }

  render () {
    const { themedStyle } = this.props

    return (
      <TabView
        selectedIndex={this.state.selectedIndex}
        onSelect={(index) => this.changeTab(index)}
        style={themedStyle.tabViewContainer}
      >
        <Tab title='Пошук'>
          <Search />
        </Tab>
        <Tab title='Сьогодні'>
          { this.state.schedule.length > 1 ? <Day day={this.state.schedule[1]} navigation={this.props.navigation} /> : null }
        </Tab>
        <Tab title='Завтра'>
          <Text>Tab 2</Text>
        </Tab>
        <Tab title='Тиждень'>
          <Text>Tab 3</Text>
        </Tab>
      </TabView>
    )
  }
}

export const Schedule = withStyles(ScheduleComponent, (theme) => ({
  tabViewContainer: {
    height: '100%',
    backgroundColor: theme['background-basic-color-2']
  }
}))
