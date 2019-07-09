import React, { Component } from 'react'
import { View } from 'react-native'
import { Modal, Text, Button, ListItem } from 'react-native-ui-kitten'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    let lesson = this.props.navigation.getParam('subject', 'NO-ID');

    console.log(lesson)

    const {
      classroom,
      lecturer,
      subgroup,
      streams_type,
      lessonNum,
      time,
      type,
      subject
    } = lesson

    return (
      <ListItem
        title={subgroup}
        description={lecturer}
      />
    )
  }
}
