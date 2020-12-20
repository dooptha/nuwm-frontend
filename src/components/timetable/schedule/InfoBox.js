import React from 'react';
import {Text, withStyles} from "react-native-ui-kitten";
import {View} from "react-native";
import I18n from "../../../utils/i18n";


const InfoBox = ({ archive, error, themedStyle }) => {

  return(
    <View>
      {
        (archive) &&
        <View style={themedStyle.archiveMessageWrapper} >
          <Text style={themedStyle.archiveMessage}>{ I18n.t('timetable.archiveShown')}</Text>
        </View>
      }
      {
        (error) &&
        <View style={themedStyle.errorMessageWrapper} >
          <Text style={themedStyle.archiveMessage}>{ error }</Text>
        </View>
      }
    </View>
  )
};

export default withStyles(InfoBox, (theme) => ({
  archiveMessageWrapper: {
    marginTop: 5,
    backgroundColor: theme['color-warning-600'],
    width: '100%',
    padding: 5,
    display: 'flex',
    justifyContent: 'center'
  },
  errorMessageWrapper: {
    marginTop: 5,
    backgroundColor: theme['color-danger-600'],
    width: '100%',
    padding: 5,
    display: 'flex',
    justifyContent: 'center'
  },
  archiveMessage: {
    color: 'white',
    textAlign: 'center'
  }
}));