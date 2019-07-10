import React, { Component } from 'react'
import { View } from 'react-native'
import DatePicker from './DatePicker'
import { Text, Button, withStyles } from 'react-native-ui-kitten'

class SearchComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { themedStyle } = this.props

    console.log('searching')

    return (
      <View>
        <DatePicker
          ref={(node) => { this.startDate = node }} />
        <DatePicker
          ref={(node) => { this.endDate = node }} />
        <Button onPress={() => this.onPress()}>Find</Button>
      </View>
    )
  }
}

export const Search = withStyles(SearchComponent, (theme) => ({
  text: {
    color: theme['background-basic-color-1']
  }
}))
