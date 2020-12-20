import React, {useContext} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import NavigationService from "../../../navigation/NavigationService";
import moment from "moment";
import { getMomentLocale } from '../../../utils/i18n';

/**
 * This class responsible for rendering schedule list and it's logic
 * when there is no subjects or when refreshing list
 */

const Subject = ({ subject, themedStyle }) => {

  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate('DetailedLesson', { subject })}
      style={themedStyle.subject}>
      <View style={{width: '70%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{subject.name}</Text>
        <Text appearance='hint' style={themedStyle.shortInfo}>{subject.shortInfo}</Text>
      </View>
      <View style={{width: '30%', alignItems: 'flex-end'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{subject.time.split('-')[0]}</Text>
        <Text appearance='hint' style={themedStyle.shortClassroom}>{subject.shortClassroom}</Text>
      </View>
    </TouchableOpacity>
  )
}

const TimelinePoint = ({ active, lastOne, themedStyle }) => (
  <View style={[themedStyle.timelineWrapper, active && themedStyle.timelineWrapperActive, lastOne && { borderLeftColor: 'rgba(0,0,0,0)' }]}>
    <View style={[themedStyle.timelinePoint, active && themedStyle.timelinePointActive]} />
  </View>
)

const DayDate = ({ date, themedStyle }) => {
  const language = getMomentLocale();

  const dateString = date.lang(language).format('D MMMM');
  const weekString = date.lang(language).format('dddd');

  return(
    <View style={themedStyle.dayDate}>
      <Text style={{ fontSize: 18, marginRight: 5 }}>{ weekString.charAt(0).toUpperCase() + weekString.slice(1) }</Text>
      <Text appearance='hint' style={themedStyle.date}>{ dateString }</Text>
    </View>
  )
}

const SubjectsList = ({ schedule, themedStyle }) => {

  return(
    <View style={themedStyle.wrapper}>
      {
        schedule.map((day, dayIndex) => {
          return(
            <View key={day.dayName + dayIndex}>
              <DayDate date={day.date} themedStyle={themedStyle} />
              {
                day.subjects.map((subject, subjectIndex) => {
                  return(
                    <View key={subject.time + subject.name} style={themedStyle.subjectWrapper}>
                      <TimelinePoint
                        active={subject.momentTime.isSameOrAfter(moment(new Date()))}
                        themedStyle={themedStyle}
                        lastOne={ day.subjects.length === subjectIndex + 1 }
                      />
                      <Subject
                        subject={subject}
                        themedStyle={themedStyle}
                      />
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default withStyles(SubjectsList, (theme) => ({
  wrapper: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 30,
    paddingBottom: 200
  },
  subjectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  subject: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-1'],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.14,
  },
  timelineWrapper: {
    borderLeftWidth: 2,
    borderLeftColor: theme['color-primary-default'],
    height: '100%',
    marginBottom: -55
  },
  timelinePoint: {
    width: 14,
    height: 14,
    backgroundColor: theme['color-primary-default'],
    borderRadius: 25,
    marginLeft: -8,
    marginTop: -8
  },
  timelinePointActive: {
    backgroundColor: theme['background-basic-color-4']
  },
  timelineWrapperActive: {
    borderLeftColor: theme['background-basic-color-4']
  },
  shortInfo: {
    fontSize: 12,
  },
  shortClassroom: {
    fontSize: 12
  },
  dayDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    marginLeft: -5,
    marginBottom: 20
  },
  date: {
    fontSize: 14
  }
}));
