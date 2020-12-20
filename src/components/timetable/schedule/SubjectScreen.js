import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, withStyles } from 'react-native-ui-kitten';
import I18n from '../../../utils/i18n';

/**
  * Displays full information about one lessons
*/

const SubjectScreen = ({ navigation, themedStyle }) => {
  const subject = navigation.state.params.subject;

  const {
    classroom,
    lecturer,
    group,
    streamsType,
    time,
    type,
    name,
  } = subject;

  return(
    <ScrollView style={themedStyle.wrapper}>
      {
        Object.entries({ name, classroom, lecturer, group, streamsType, time, type }).map(([key, value]) => {
          return(
            <View key={key} style={themedStyle.subjectInfo}
            >
              <Text style={themedStyle.title} appearance="hint">{ I18n.t(`timetable.lesson.${key}`) }</Text>
              <Text style={themedStyle.info} >{ value || '-' }</Text>
            </View>
          )
        })
      }
    </ScrollView>
  )
};

export default withStyles(SubjectScreen, (theme) => ({
  wrapper: {
    height: '100%',
    backgroundColor: theme['background-basic-color-2']
  },
  subjectInfo: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.14,
  },
  title: {
    width: '30%',
    textAlign: 'left'
  },
  info: {
    width: '65%',
    marginLeft: '5%',
    textAlign: 'left'
  }
}));
