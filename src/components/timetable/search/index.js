import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
  }

  componentDidMount() {
    const [{ app }] = this.context;
    const { group } = app.properties;

    this.setState({ group });
  }

  getDate() {
    const {
      state: { practicsOnly, group, lecturer }, dateNode,
    } = this;

    const { startDate, endDate } = dateNode.getDate();

    return {
      startDate, endDate, lecturer, group, practicsOnly,
    };
  }

  findSubjects() {
    const searchData = this.getDate();

    let isEnoughData = true;

    if (!searchData.startDate || !searchData.endDate) {
      this.dateNode.inputNode.setStatus('danger');
      isEnoughData = false;
    } else {
      this.dateNode.inputNode.setStatus('primary');
    }

    if (isEnoughData) {
      getSchedule(searchData).then((data) => {
        if (data.error || data.length === 0) {
          NavigationService.navigate('ScheduleList', { schedule: [], message: data.error });
        } else {
          NavigationService.navigate('ScheduleList',
            { schedule: replaceDatesWithMomentObjects(data) });
        }
      });
    }
  }

  render() {
    const {
      practicsOnly,
      group,
      lecturer,
    } = this.state;

    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.searchContainer}>
        <ScrollView style={themedStyle.inputsContainer}>
          <View style={themedStyle.inputContainer}>
            <DatePicker
              label={I18n.t('timetable.search.Date')}
              ref={(node) => { this.dateNode = node; }}
            />
          </View>

          <View style={themedStyle.inputContainer}>
            <TeacherInput
              label={I18n.t('timetable.search.Lecturer')}
              placeholder={I18n.t('timetable.search.LecturerExample')}
              name="lecturer"
              value={lecturer}
              onChangeText={(text) => this.setState({ lecturer: text })}
            />
          </View>

          <View style={themedStyle.inputContainer}>
            <GroupInput
              label={I18n.t('timetable.search.Group')}
              name="group"
              value={group}
              onChangeText={(text) => this.setState({ group: text })}
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
    paddingBottom: 30,
    paddingHorizontal: 15,
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
