import React, { Component } from 'react'
import { View } from 'react-native'
import Lesson from './Lesson'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderAllSubjects () {
    return this.props.day.subjects.map(subject =>
      <Lesson
        key={subject.day}
        subject={subject}
        navigation={this.props.navigation}
      />
    )
  }

  render () {
    let body = this.props.day.subjects.length > 0
      ? this.renderAllSubjects() : null

    return (
      <View>
        { body }
      </View>
    )
  }
}
