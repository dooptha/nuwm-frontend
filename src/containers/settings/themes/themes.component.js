import React from 'react'
import { View } from 'react-native'
import { withStyles } from 'react-native-ui-kitten'
import { ThemesList } from '../../../components/settings'
import { Message } from '../../../components/conversations'

const ThemesComponent = (props) => {
  const { themedStyle, data, onItemSelect } = props

  const messages = [
    {
      body: 'Колись мені сказали',
      date: '13:00',
      sender: false
    },
    {
      body: 'Що світ мене роздавить',
      date: '13:02',
      sender: true
    }
  ]

  return (
    <View style={themedStyle.container}>
      <Message message={messages[0]} />
      <Message message={messages[1]} />
      <ThemesList
        contentContainerStyle={themedStyle.contentContainer}
        data={data}
        onItemSelect={(i) => onItemSelect(i)}
      />
    </View>
  )
}

export const Themes = withStyles(ThemesComponent, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2']
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
}))
