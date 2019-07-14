import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import {
  Button, withStyles, Input, Toggle,
} from 'react-native-ui-kitten';
import DatePickerMultiple from './common/DatePickerMultiple';
import FormItem from './common/FormItem';
import I18n from '../../utils/i18n';
import Api from '../../api/schedule';
import TimeHelper from '../../utils/time';
import NavigationService from '../../navigation/NavigationService';

class Search extends Component {
  constructor(props) {
    super(props);
    this.localize = (t) => I18n.t(`timetable.search.${t}`);
    this.state = {
      selectedIndex: 0,
      lecturer: '',
      group: '',
      showOnlyLabs: false,
    };
  }

  getData() {
    const { lecturer, group, selectedIndex } = this.state;

    const startDate = TimeHelper.toApiDateFormat(new Date(this.startDate.state.date));
    const endDate = TimeHelper.toApiDateFormat(new Date(selectedIndex === 0 ? this.startDate.state.date : this.endDate.state.date));

    const searchData = {
      startDate,
      endDate,
      lecturer,
      group,
    };

    Api.getSchedule(searchData).then((data) => {
      NavigationService.navigate('ScheduleList', { schedule: data, refreshing: false, onRefresh: () => {} });
    });
  }

  switchTab(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { themedStyle } = this.props;
    const { lecturer, group, showOnlyLabs } = this.state;

    return (
      <View style={themedStyle.searchContainer}>
        <ScrollView style={themedStyle.inputsContainer}>
          <FormItem label="Дата">
            <DatePickerMultiple ref={(node) => { this.startDate = node; }} />
          </FormItem>

          <FormItem label={this.localize('Lecturer')}>
            <Input
              style={themedStyle.input}
              value={lecturer}
              placeholder={this.localize('LecturerExample')}
              onChangeText={(value) => { this.setState({ lecturer: value }); }}
            />
          </FormItem>

          <FormItem label={this.localize('Group')}>
            <Input
              value={group}
              style={themedStyle.input}
              placeholder={this.localize('GroupExample')}
              onChangeText={(value) => { this.setState({ group: value }); }}
            />
          </FormItem>

          <FormItem row label={this.localize('PracticsOnly')}>
            <Toggle
              checked={showOnlyLabs}
              onChange={(state) => { this.setState({ showOnlyLabs: state }); }}
            />
          </FormItem>

        </ScrollView>
        <Button style={themedStyle.button} onPress={() => this.getData()}>
          {this.localize('Search')}
        </Button>
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
  searchContainer: {
    flex: 1,
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
  indicatorStyle: {
    display: 'none',
  },
  button: {
    width: '46%',
    marginLeft: '27%',
    borderWidth: 0,
    marginBottom: 45,
    marginTop: 8,
  },
  input: {
    borderRadius: 2,
    width: '100%',
  },
}));
