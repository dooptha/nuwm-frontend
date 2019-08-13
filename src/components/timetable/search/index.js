import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import {
  Button, withStyles, Toggle,
} from 'react-native-ui-kitten';
import I18n from '../../../utils/i18n';
import { getSchedule } from '../../../api/schedule';
import NavigationService from '../../../navigation/NavigationService';
import FormInput from '../common/Form/Input';
import DatePicker from '../common/DatePicker';
import FormItem from '../common/FormItem';
import { replaceDatesWithMomentObjects } from '../helper';
import { StateContext } from '../../../utils/context';

class Search extends Component {
  static contextType = StateContext;

  state = {
    practicsOnly: false,
  }

  constructor(props) {
    super(props);
    this.localize = (t) => I18n.t(`timetable.search.${t}`);
  }

  getDate() {
    const {
      state: { practicsOnly }, groupNode, lecturerNode, dateNode,
    } = this;

    const { startDate, endDate } = dateNode.getDate();
    const group = groupNode.state.value;
    const lecturer = lecturerNode.state.value;

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

    if (!searchData.group && !searchData.lecturer) {
      this.groupNode.setStatus('danger');
      this.lecturerNode.setStatus('danger');
      isEnoughData = false;
    } else {
      this.groupNode.setStatus('primary');
      this.lecturerNode.setStatus('primary');
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
    const { context } = this;
    const { themedStyle } = this.props;
    const { practicsOnly } = this.state;

    const defaultGroup = context[0].app.properties.group;

    return (
      <View style={themedStyle.searchContainer}>
        <ScrollView style={themedStyle.inputsContainer}>
          <FormItem className="date" label="Дата">
            <DatePicker ref={(node) => { this.dateNode = node; }} />
          </FormItem>

          <FormItem className="lecturer" label={this.localize('Lecturer')}>
            <FormInput
              placeholder={this.localize('LecturerExample')}
              ref={(node) => { this.lecturerNode = node; }}
            />
          </FormItem>

          <FormItem id="group" label={this.localize('Group')}>
            <FormInput
              defaultValue={defaultGroup}
              placeholder={this.localize('GroupExample')}
              ref={(node) => { this.groupNode = node; }}
            />
          </FormItem>

          <FormItem id="practics-only" row label={this.localize('PracticsOnly')}>
            <Toggle
              checked={practicsOnly}
              onChange={(v) => this.setState({ practicsOnly: v })}
            />
          </FormItem>

        </ScrollView>
        <Button id="search-button" style={themedStyle.button} onPress={() => this.findSubjects()}>
          {this.localize('Search')}
        </Button>
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
  searchContainer: {
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
    marginLeft: '27%',
    borderWidth: 0,
    marginBottom: 45,
    marginTop: 8,
  },
}));
