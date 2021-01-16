import React, { useEffect, useState, useContext } from 'react';
import { RefreshControl, View, TouchableOpacity } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import DefaultPreference from 'react-native-default-preference';
import Schedule from './schedule/Schedule';
import Datepicker from 'rn-lightweight-date-picker';
import { SearchIcon } from '../../assets/icons';
import { getSchedule, dateToApiFormat } from '../../api/timetable';
import { storeKey } from '../../utils/storage';
import { StateContext } from '../../utils/context';
import { replaceDatesWithMoment } from './helper';
import moment from "moment";
import NavigationService from "../../navigation/NavigationService";

const Timetable = ({ themedStyle }) => {
  const [{ app }] = useContext(StateContext);
  const { group } = app.properties;

  const [schedule, setSchedule] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [error, setError] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());

  // behaviour pattern:
  /*
    on launch tries to fetch schedule from the server
    if server cant be reached - load schedule from storage
    if can be - save schedule to storage and display data
   */

  const requestSchedule = (startDate, endDate) => {
    setRefreshing(true);

    return getSchedule({ group, startDate, endDate })
      .then((resData) => {
        setRefreshing(false);

        if (resData.error) {
          setError(resData.error);
        }else{
          setError(false);
        }

        return resData;
      })
      .catch((err) => {
        console.error(err)
      });
  };

  // fetch schedule for next 7 days, this schedule will be saved to local storage and
  // will be reused if server couldnt be reached, this storage is also used by widget
  useEffect(() => {
    const startDate = dateToApiFormat(moment(new Date()));
    const endDate = dateToApiFormat(moment(new Date()).add(14, 'days'));

    requestSchedule(startDate, endDate).then((rawData) => {
      if(!rawData.error){
        DefaultPreference.clear('schedule');
        storeKey('schedule', JSON.stringify(rawData));

        storeKey('scheduleDate', new Date().toJSON());
        let serializedData = replaceDatesWithMoment(rawData);

        setSchedule(serializedData.filter((day) => day.date.isSame(moment(new Date()), 'day')))
      }
    });
  }, []);

  // if date in datepicker was changed - automatically fetch new day
  useEffect(() => {

    const startDate = dateToApiFormat(moment(chosenDate));
    const endDate = dateToApiFormat(moment(chosenDate));

    requestSchedule(startDate, endDate).then(rawData => {
      if(!rawData.error){
        let serializedData = replaceDatesWithMoment(rawData);
        setSchedule(serializedData);
      }
    })
  }, [chosenDate])

  return (
    <View style={themedStyle.wrapper}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 5 }}>
        <Datepicker
          minimized={true}
          showControls={true}
          mode="single"
          locale={app.properties.language === 'ua' ? 'uk' : app.properties.language}
          initialDate={new Date()}
          start={new Date()}
          onDateChange={(date) => setChosenDate(date)}
          userStyles={themedStyle.calendar}
          userColors={themedStyle.userColors}
          leftControl={<Text appearance="hint">{'<'}</Text>}
          rightControl={<Text appearance="hint">{'>'}</Text>}
        />
      </View>
      <Schedule
        data={schedule}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setChosenDate(new Date(chosenDate))} />}
        refreshing={refreshing}
        error={error}
        chosenDate={chosenDate}
      />
      <TouchableOpacity onPress={() => NavigationService.navigate('SearchScreen')} style={themedStyle.searchButton}>
        { SearchIcon(themedStyle.searchIcon) }
      </TouchableOpacity>
    </View>
  );
}

export default withStyles(Timetable, (theme) => ({
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
  },
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
