import React from 'react'
import { View } from 'react-native'
import {
  List,
  ListItem
} from 'react-native-ui-kitten'

export const ConversationsList = ({ data, onItemSelect }) => {
  const renderItem = (info) => {
    return (
      <ListItem
        title={info.item.params.conversation.title}
        onPress={(i) => onItemSelect(i)}
      />
    )
  }

  return (
    <View>
      <List
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}
