import React from 'react'
import { View } from 'react-native'
import { withStyles } from 'react-native-ui-kitten'
import { ConversationsList } from '../../../components/conversations'

const ConversationsComponent = (props) => {
  const { themedStyle, data, onItemSelect } = props
  return (
    <View style={themedStyle.container}>
      <ConversationsList
        contentContainerStyle={themedStyle.contentContainer}
        data={data}
        onItemSelect={(i) => onItemSelect(i)}
      />
    </View>
  )
}

export const Conversations = withStyles(ConversationsComponent, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2']
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
}))
