import React, { Component } from 'react'
import { View } from 'react-native'
import Subject from './Subject'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderAllSubjects () {
    return this.props.day.subjects.map(subject =>
      <Subject
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
