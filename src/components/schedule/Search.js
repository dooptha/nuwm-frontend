import React, { Component } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import {
  Button, withStyles, BottomNavigation, BottomNavigationTab, Input, Toggle,
} from 'react-native-ui-kitten';
import DatePicker from './common/DatePicker';
import ListRow from './common/ListRow';
import I18n from '../../utils/i18n';
import Api from '../../api/schedule';
import TimeHelper from '../../utils/time';
import NavigationService from '../../navigation/NavigationService';
import BottomButton from './common/BottomButton';

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

  renderDatePickers() {
    const { selectedIndex } = this.state;

    if (selectedIndex === 0) {
      return (
        <DatePicker mode="single" ref={(node) => { this.startDate = node; }} />
      );
    }
    return (
      <DatePicker mode="range" ref={(node) => { this.startDate = node; }} />
    );
  }

  render() {
    const { themedStyle } = this.props;
    const { lecturer, group, showOnlyLabs } = this.state;

    const body = this.renderDatePickers();

    return (
      <View style={themedStyle.searchContainer}>
        <ScrollView style={themedStyle.inputsContainer}>
          <ListRow label="Дата">
            { body }
          </ListRow>

          <ListRow label={this.localize('Lecturer')}>
            <Input
              style={themedStyle.input}
              value={lecturer}
              placeholder={this.localize('LecturerExample')}
              onChangeText={(value) => { this.setState({ lecturer: value }); }}
            />
          </ListRow>

          <ListRow label={this.localize('Group')}>
            <Input
              value={group}
              style={themedStyle.input}
              placeholder={this.localize('GroupExample')}
              onChangeText={(value) => { this.setState({ group: value }); }}
            />
          </ListRow>

          <ListRow label={this.localize('PracticsOnly')} row>
            <Toggle
              checked={showOnlyLabs}
              onChange={(state) => { this.setState({ showOnlyLabs: state }); }}
            />
          </ListRow>

        </ScrollView>
        <Button style={themedStyle.button} onPress={() => this.getData()}>
          {this.localize('Search')}
        </Button>
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
  inputsContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingTop: 5,
  },
  searchContainer: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: theme['background-basic-color-1'],
  },
  titleText: {
  },
  indicatorStyle: {
    display: 'none',
  },
  tabContainer: {
    width: '100%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderRadius: 1,
    padding: 0,
    backgroundColor: theme['background-basic-color-2'],
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    width: '46%',
    marginLeft: '27%',
    borderWidth: 0,
    marginBottom: 35,
    marginTop: 8,
  },
  input: {
    borderRadius: 2,
    width: '100%',
  },
}));
