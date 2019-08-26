import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Button,
  Toggle,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import I18n from '../../../utils/i18n';
import { getSchedule } from '../../../api/timetable';
import NavigationService from '../../../navigation/NavigationService';
import DatePicker from '../common/DatePicker';
import { replaceDatesWithMomentObjects } from '../helper';
import { StateContext } from '../../../utils/context';
import GroupInput from '../../../containers/common/GroupInput';
import TeacherInput from '../../../containers/common/TeacherInput';

class Search extends Component {
  static contextType = StateContext;

  state = {
    practicsOnly: false,
  }

  constructor(props) {
    super(props);
    this.localize = (t) => I18n.t(`timetable.search.${t}`);

    this.state = {
      group: '',
      lecturer: '',
      errors: {},
      startDate: null,
      endDate: null,
    };

    this.scrollViewRef = React.createRef();
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentDidMount() {
    const [{ app }] = this.context;
    const { group } = app.properties;

    this.setState({ group });
  }

  onInputChange(key, text) {
    const { errors } = this.state;
    const clearError = {};
    const change = {};

    // Reset input error
    clearError[key] = false;
    change.errors = { ...errors, ...clearError };

    // Change input value
    change[key] = text;
    this.setState(change);
  }


  onDataPickerChange(data) {
    const { errors } = this.state;
    const {
      currentDate,
      startDate,
      endDate,
    } = data;

    if (currentDate) {
      this.setState({
        startDate: currentDate,
        endDate: currentDate,
      });
    } else {
      this.setState({
        startDate,
        endDate,
        errors: { ...errors, date: false },
      });
    }
  }

  onContentSizeChange() {
    this.scrollViewRef.current.scrollToEnd({ animated: false });
  }

  findSubjects() {
    const {
      practicsOnly,
      group,
      lecturer,
      startDate,
      endDate,
    } = this.state;

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
      getSchedule({
        startDate,
        endDate,
        group,
        lecturer,
        practicsOnly,
      }).then((data) => {
        if (data.error || data.length === 0) {
          NavigationService.navigate('ScheduleList', { schedule: [], message: data.error });
        } else {
          NavigationService.navigate('ScheduleList',
            { schedule: replaceDatesWithMomentObjects(data) });
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

      this.setState({ errors });
    }
  }

  render() {
    const {
      practicsOnly,
      group,
      lecturer,
      errors,
    } = this.state;

    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.searchContainer}>
        <ScrollView
          ref={this.scrollViewRef}
          onContentSizeChange={this.onContentSizeChange}
          style={themedStyle.inputsContainer}
        >
          <View style={themedStyle.inputContainer}>
            <DatePicker
              label={I18n.t('timetable.search.Date')}
              status={errors.date ? 'danger' : null}
              onConfirm={(data) => this.onDataPickerChange(data)}
            />
          </View>

          <View style={themedStyle.inputContainer}>
            <TeacherInput
              label={I18n.t('timetable.search.Lecturer')}
              placeholder={I18n.t('timetable.search.LecturerExample')}
              name="lecturer"
              value={lecturer}
              status={errors.lecturer ? 'danger' : null}
              onChangeText={(text) => this.onInputChange('lecturer', text)}
            />
          </View>

          <View style={themedStyle.inputContainer}>
            <GroupInput
              label={I18n.t('timetable.search.Group')}
              name="group"
              value={group}
              status={errors.group ? 'danger' : null}
              onChangeText={(text) => this.onInputChange('group', text)}
            />
          </View>

          <View style={themedStyle.practicsOnlyContainer}>
            <Text
              style={themedStyle.practicsOnlyLabel}
            >
              {I18n.t('timetable.search.PracticsOnly')}
            </Text>
            <Toggle
              checked={practicsOnly}
              onChange={(v) => this.setState({ practicsOnly: v })}
            />
          </View>

          <Button id="search-button" style={themedStyle.button} onPress={() => this.findSubjects()}>
            {this.localize('Search')}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
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
  inputContainer: {
    marginBottom: 30,
    marginHorizontal: 15,
  },
  button: {
    width: '46%',
    marginLeft: '27%',
    borderWidth: 0,
    marginBottom: 45,
    marginTop: 8,
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
