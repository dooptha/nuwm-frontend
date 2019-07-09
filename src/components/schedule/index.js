import React, { Component } from 'react'
import { View } from 'react-native'

import { TopNavigationAction } from 'react-native-ui-kitten'
import axios from 'axios'

/* import DatePicker from './DatePicker' */
import Day from './Day'

export default class Schedule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultGroup: 'ПМ-41',
      schedule: [],
      selectedIndex: 1
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

  render () {

    return (
      <View>
        { this.state.schedule.length > 1 ? <Day day={this.state.schedule[1]} navigation={this.props.navigation} /> : null }
      </View>
    )
  }
}

/*  <DatePicker
    ref = { (node) => { this.startDate = node }} />
  <DatePicker
    ref = { (node) => { this.endDate = node }} />
  <Button onPress = {() => this.onPress()}>Find</Button>  */
