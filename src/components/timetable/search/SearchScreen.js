import React, { useState, useRef, useContext } from 'react';
import {Button, Text, withStyles} from "react-native-ui-kitten";
import Datepicker from 'rn-lightweight-date-picker';
import {Alert, ScrollView, View} from "react-native";
import TeacherInput from "../../../containers/common/TeacherInput";
import I18n from "../../../utils/i18n";
import GroupInput from "../../../containers/common/GroupInput";
import {StateContext} from "../../../utils/context";
import ActivityIndicator from "../common/ActivityIndicator";
import { getSchedule, dateToApiFormat } from "../../../api/timetable";
import NavigationService from "../../../navigation/NavigationService";
import {replaceDatesWithMoment} from "../helper";
import moment from "moment";

const SearchScreen = ({ themedStyle }) => {
  const [{ app }] = useContext(StateContext);

  const [lecturer, setLecturer] = useState('');
  const [group, setGroup] = useState(app.properties.group);
  const [errors, setErrors] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [loading, setLoading] = useState(false);

  const lecturerInput = useRef(null);
  const groupInput = useRef(null);
  const scrollRef = useRef(null);

  const fetchSchedule = () => {
    let isEnoughData = true;
    const errors = {};
    const validGroup = group && group !== '';
    const validLecturer = lecturer && lecturer !== '';

    if (!(validGroup || validLecturer)) {
      errors.group = true;
      errors.lecturer = true;
      isEnoughData = false;
    }

    if (!startDate || !endDate) {
      errors.date = true;
      isEnoughData = false;
    }

    if (isEnoughData) {
      setLoading(true);

      getSchedule({ startDate: dateToApiFormat(moment(startDate)), endDate: dateToApiFormat(moment(endDate)), group, lecturer }).then((data) => {
        setLoading(false);

        if (data.error || data.length === 0) {
          Alert.alert(
            I18n.t('timetable.noServer'),
            I18n.t('timetable.tryLater'),
            [{
              text: I18n.t('errors.ok'),
            }],
          );
        } else {
          NavigationService.navigate('SearchResultsScreen', { schedule: replaceDatesWithMoment(data) });
        }
      });
    } else {
      Alert.alert(
        I18n.t('timetable.errorInvalidData.title'),
        I18n.t('timetable.errorInvalidData.description'),
        [{
          text: I18n.t('errors.ok'),
        }],
      );

      setErrors(errors);
    }
  };

  const button = loading ? <ActivityIndicator color={themedStyle.colors.icon} /> : (
    <Button id="search-button" style={themedStyle.button} onPress={() => fetchSchedule()}>
      { I18n.t(`timetable.search.Search`) }
    </Button>
  );

  const scrollTo = (y) => {
    scrollRef.current.scrollTo({
      animated: true,
      y,
    });
  }

  const onInputChange = (key, text) => {
    const clearError = {};

    // Reset input error
    clearError[key] = false;
    setErrors({ ...errors, ...clearError })

    if(key === 'lecturer'){
      setLecturer(text);
    }

    if(key === 'group'){
      setGroup(text);
    }
  }

  const onContentSizeChange = () => {
    const lecturerFocused = lecturerInput.current.isFocused();
    const groupFocused = groupInput.current.isFocused();

    if (lecturerFocused) {
      scrollTo(275);
    } else if (groupFocused) {
      scrollTo(380);
    }
  }

  return(
    <ScrollView
      ref={scrollRef}
      onContentSizeChange={onContentSizeChange}
      style={themedStyle.wrapper}
      contentContainerStyle={themedStyle.scroll}
    >
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 150, justifyContent: 'flex-start' }}>
        <Datepicker
          showControls={true}
          mode="range"
          locale={app.properties.language === 'ua' ? 'uk' : app.properties.language}
          initialDate={new Date()}
          onDateChange={(date) => { setStartDate(date.start); setEndDate(date.end)}}
          userStyles={{
            wrapper: { height: 'auto' }
          }}
          leftControl={<Text appearance="hint">{'<'}</Text>}
          rightControl={<Text appearance="hint">{'>'}</Text>}
          userColors={themedStyle.userColors}
        />
        <View style={themedStyle.inputContainer}>
          <TeacherInput
            label={I18n.t('timetable.search.Lecturer')}
            placeholder={I18n.t('timetable.search.LecturerExample')}
            name="lecturer"
            value={lecturer}
            status={errors.lecturer ? 'danger' : null}
            onChangeText={(text) => onInputChange('lecturer', text)}
            inputReference={lecturerInput}
            onFocus={() => scrollTo(135)}
          />
        </View>

        <View style={themedStyle.inputContainer}>
          <GroupInput
            label={I18n.t('timetable.search.Group')}
            name="group"
            value={group}
            status={errors.group ? 'danger' : null}
            onChangeText={(text) => onInputChange('group', text)}
            inputReference={groupInput}
            onFocus={() => scrollTo(230)}
          />
        </View>
        <View style={themedStyle.buttonWrapper}>
          { button }
        </View>
      </View>
    </ScrollView>
  )
}

export default withStyles(SearchScreen, (theme) => ({
  wrapper: {
    backgroundColor: theme['background-basic-color-1']
  },
  userColors: {
    wrapper: theme['background-basic-color-1'],
    title: theme['text-basic-color'],
    selectedDay: theme['color-primary-default'],
    initialDay: theme['color-primary-default'],
    dayOfTheWeek: theme['text-hint-color'],
    range: theme['border-basic-color-3'],
    dayText: theme['text-basic-color'],
    unavailable: theme['text-hint-color']
  },
  inputContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10
  },
  searchContainer: {
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
    height: '100%',
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: theme['background-basic-color-1'],
  },
  inputsContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingTop: 5,
  },
  button: {
    width: '46%',
  },
  colors: {
    icon: theme['text-basic-color'],
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  practicsOnlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  practicsOnlyLabel: {
    color: theme['text-hint-color'],
  },
}));
