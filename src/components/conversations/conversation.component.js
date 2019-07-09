import React, { Component } from 'react'
import {
  List,
  ListItem
} from 'react-native-ui-kitten'
import { Message } from './message.component'

export class Conversation extends Component {
  constructor (props) {
    super(props)

    this.data = props.data

    this.renderItem = (info) => {
      return (
        <ListItem
          title={info.item.body}
          onPress={(i) => props.onItemSelect(i)}
        />
      )
    }
  }

  renderMessage (info) {
    return (
      <Message
        index={info.index}
        message={info.item}
      />
    )
  }

  render () {
    return (
      <List
        data={this.data}
        renderItem={(info) => this.renderMessage(info)}
      />
    )
  }
};
