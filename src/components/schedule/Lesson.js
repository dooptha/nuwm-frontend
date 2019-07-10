import React, { Component } from 'react'
import { ListItem } from 'react-native-ui-kitten'
import { View } from 'react-native'
import NavigationService from '../../core/navigation/NavigationService'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onPress () {
    NavigationService.navigate('DetailedLesson',
      { subject: this.props.subject }
    )
  }

  openModal () {

  }

  render () {
    const {
      classroom,
      /* lecturer,
      subgroup,
      streams_type,
      lessonNum, */
      time,
      /* type, */
      subject
    } = this.props.subject

    console.log('rerender')

    return (
      <View>
        <ListItem
          title={'(' + classroom + ') ' + subject}
          description={time}
          onPress={() => this.onPress()}
        />
      </View>
    )
  }
}
