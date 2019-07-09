import React from 'react'
import { View } from 'react-native'
import { withStyles } from 'react-native-ui-kitten'
import { SettingsList } from '../../../components/settings'

const SettingsComponent = (props) => {
  const { themedStyle, data, onItemSelect } = props
  return (
    <View style={themedStyle.container}>
      <SettingsList
        contentContainerStyle={themedStyle.contentContainer}
        data={data}
        onItemSelect={(i) => onItemSelect(i)}
      />
    </View>
  )
}

export const Settings = withStyles(SettingsComponent, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2']
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
}))
