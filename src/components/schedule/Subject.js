import React, { Component } from 'react'
import { ListItem } from 'react-native-ui-kitten'
import { View } from 'react-native'
import DetailedLesson from './DetailedLesson'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFullSubject: false
    }
  }

  onPress () {
    console.log('pressed')

    // this.setState({ showFullSubject: true })

    this.props.navigation.navigate('DetailedLesson',
      { subject: this.props.subject }
    )
  }

  openModal () {

  }

  render () {

    console.log(this.props)
    console.log(this.props.navigation)

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
        { this.state.showFullSubject
          ? <DetailedLesson subject={this.props.subject} /> : null
        }
      </View>
    )
  }
}
