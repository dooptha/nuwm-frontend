import React, {useContext, useEffect, useState} from 'react';
import { withStyles, Text } from 'react-native-ui-kitten';
import {StateContext} from "../../../utils/context";
import moment from "moment";
import DefaultPreference from "react-native-default-preference";
import {replaceDatesWithMoment} from "../helper";
import {Image, RefreshControl, ScrollView, TouchableOpacity, View} from "react-native";
import I18n from "../../../utils/i18n";
import SubjectsList from "./SubjectsList";
import InfoBox from "./InfoBox";

const Schedule = ({ data, error, refreshing, refreshControl, themedStyle, chosenDate }) => {
  const [{ app }] = useContext(StateContext);
  const { group } = app.properties;

  const [schedule, setSchedule] = useState(data);
  const [archive, setArchive] = useState([]);
  const [archiveDate, setArchiveDate] = useState(new Date(0));

  useEffect(() => {
    setSchedule(data)
  }, [data]);

  useEffect(() => {
    setSchedule([...schedule]);
    setArchive([...archive]);
  }, [app.properties.language]);

  // get archived data when page rendered
  useEffect(() => {
    DefaultPreference.get('schedule').then((rawData) => {
      const data = JSON.parse(rawData);
      let serializedData = replaceDatesWithMoment(data);
      setArchive(serializedData);
    });

    DefaultPreference.get('scheduleDate').then(date => {
      if(date){
        setArchiveDate(new Date(date));
      }
    })
  }, []);

  // if app see that there is an error from response, it will try to get schedule from archive
  useEffect(() => {
    if(error){
      setSchedule(archive.filter((day) => day.date.isSame(moment(chosenDate), 'day')))
    }else{
    }
  }, [error, archive, chosenDate, data]);

  const isArchive = error && moment(chosenDate).isBefore(moment(new Date(archiveDate)).add(14, 'days'), 'day') && moment(chosenDate).isSameOrAfter(moment(new Date(archiveDate)), 'day');
  const isError = error && !isArchive;

  return (
    <View style={themedStyle.wrapper}>
      <View>
        <InfoBox
          archive={isArchive}
          error={isError ? error : false}
        />
        <ScrollView
          style={themedStyle.scrollContainer}
          contentContainerStyle={themedStyle.scroll}
          refreshControl={refreshControl || null}
        >
          {
            (schedule.length > 0 && !refreshing) &&
            <SubjectsList
              schedule={schedule}
            />
          }
          {
            (schedule.length === 0 && !refreshing && !isError) &&
            <View style={{ width: '100%', marginTop: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={themedStyle.noLessonImage}
                source={require('../../../assets/images/Sleeping_cat.png')}
              />
              <Text appearance='hint'>{ I18n.t('timetable.noLesson') }</Text>
            </View>
          }

        </ScrollView>
      </View>
    </View>
  );
}

export default withStyles(Schedule, (theme) => ({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: theme['background-basic-color-1']
  },
  calendar: {
    wrapper: { flex: 1, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 },
    subtitle: { display: 'none' },
    topBar: { paddingTop: 0, paddingBottom: 15 },
    title: { fontSize: 16 }
  },
  userColors: {
    wrapper: theme['background-basic-color-1'],
    title: theme['text-basic-color'],
    selectedDay: theme['color-primary-default'],
    initialDay: theme['color-primary-default'],
    dayOfTheWeek: theme['text-hint-color'],
    range: theme['background-basic-color-2'],
    dayText: theme['text-basic-color'],
    unavailable: theme['text-hint-color']
  },
  scroll: {
    flexDirection: 'row',
  },
  scrollContainer: {
    backgroundColor: theme['background-basic-color-2'],
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
    height: '100%'
  },
  searchIcon: {
    tintColor: 'white',
    width: 30,
    height: 30
  },
  searchButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    backgroundColor: theme['color-primary-default'],
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 10
  },
  noLessonImage: {
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
    tintColor: theme['text-hint-color']
  }
}));
