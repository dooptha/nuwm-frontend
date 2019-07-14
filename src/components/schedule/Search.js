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
        <ListRow>
          <DatePicker ref={(node) => { this.startDate = node; }} />
        </ListRow>
      );
    }
    return (
      <View>
        <ListRow>
          <DatePicker ref={(node) => { this.startDate = node; }} />
        </ListRow>
        <ListRow>
          <DatePicker ref={(node) => { this.endDate = node; }} />
        </ListRow>
      </View>
    );
  }

  renderTabs() {
    const { themedStyle } = this.props;
    const { selectedIndex } = this.state;

    return (
      <ListRow>
        <BottomNavigation
          style={themedStyle.tabContainer}
          selectedIndex={selectedIndex}
          onSelect={(index) => this.switchTab(index)}
          indicatorStyle={themedStyle.indicatorStyle}
        >
          <BottomNavigationTab title={this.localize('OnlyDay')} />
          <BottomNavigationTab title={this.localize('Range')} />
        </BottomNavigation>
      </ListRow>
    );
  }

  render() {
    const { themedStyle } = this.props;
    const { lecturer, group, showOnlyLabs } = this.state;

    const body = this.renderDatePickers();
    const tabs = this.renderTabs();

    return (
      <ScrollView style={themedStyle.searchContainer}>
        { tabs }
        { body }

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

        <ListRow label={this.localize('PracticsOnly')}>
          <Toggle
            style={themedStyle.checkbox}
            checked={showOnlyLabs}
            onChange={(state) => { this.setState({ showOnlyLabs: state }); }}
          />
        </ListRow>

        <Button style={themedStyle.button} onPress={() => this.getData()}>
          {this.localize('Search')}
        </Button>
      </ScrollView>
    );
  }
}

export default withStyles(Search, (theme) => ({
  searchContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingTop: 5,
  },
  titleText: {
  },
  indicatorStyle: {
    display: 'none',
  },
  tabContainer: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  button: {
    marginTop: 25,
    width: '46%',
    marginLeft: '27%',
    borderWidth: 0,
    marginBottom: 70,
  },
  input: {
    borderRadius: 2,
    width: '100%',
  },
  checkbox: {
  },
}));
