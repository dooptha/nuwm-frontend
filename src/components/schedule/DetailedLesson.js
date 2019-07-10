import React, { Component } from 'react'
import { View } from 'react-native'
import { Modal, Text, Button, ListItem, withStyles } from 'react-native-ui-kitten'

class DetailedLessonComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  drawLine (data) {
    const { themedStyle } = this.props
    const { title, info } = data

    if (info) {
      return (
        <View style={themedStyle.list}>
          <Text style={themedStyle.title}
            appearance='hint'
            category='s2'
          >
            { title }
          </Text>
          <Text style={themedStyle.info}>
            { info }
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  render () {
    let lesson = this.props.navigation.getParam('subject', 'NO-ID');

    console.log(lesson)

    const { themedStyle } = this.props

    console.log(this.props)

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
      <View style={themedStyle.detailsWrapper}>
        { this.drawLine({ title: 'Предмет', info: subject }) }
        { this.drawLine({ title: 'Аудиторія', info: classroom }) }
        { this.drawLine({ title: 'Викладач', info: lecturer }) }
        { this.drawLine({ title: 'Группа', info: subgroup }) }
        { this.drawLine({ title: 'Пігруппа', info: streams_type }) }
        { this.drawLine({ title: 'Час', info: time }) }
        { this.drawLine({ title: 'Тип', info: type }) }
      </View>
    )
  }
}

export const DetailedLesson = withStyles(DetailedLessonComponent, (theme) => ({
  detailsWrapper: {
    paddingTop: 25,
    height: '100%',
    backgroundColor: theme['background-basic-color-2']
  },
  list: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    borderBottomColor: theme['background-basic-color-1'],
    borderBottomWidth: 1
  },
  title: {
    width: '30%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25
  },
  info: {
    width: '70%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35
  }
}))
