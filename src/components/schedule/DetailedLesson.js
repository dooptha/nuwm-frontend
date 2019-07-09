import React, { Component } from 'react'
import { View } from 'react-native'
import { Modal, Text, Button, ListItem, withStyles } from 'react-native-ui-kitten'

export default class DetailedLessonComponent extends Component {
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
      <View>
        <Text>
          Title:
        </Text>
        <Text>
          Wow:
        </Text>
      </View>

    )
  }
}

export const DetailedLesson = withStyles(DetailedLessonComponent, (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1']
  }
}))
