import React, { Component } from 'react'
import { View } from 'react-native'
import {
  List,
  ListItem
} from 'react-native-ui-kitten'
import I18n from '../../utils/i18n'

export class LanguageList extends Component {
  constructor (props) {
    super(props)

    this.data = props.data
    this.renderItem = (info) => (
      <ListItem
        title={I18n.t(info.item.title)}
        onPress={(i) => props.onItemSelect(i)}
      />
    )
  }

  render () {
    return (
      <View>
        <List
          data={this.data}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
