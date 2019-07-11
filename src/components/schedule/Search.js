import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Button, withStyles, BottomNavigation, BottomNavigationTab, Input, Toggle,
} from 'react-native-ui-kitten';
import DatePicker from './common/DatePicker';
import ListRow from './common/ListRow';
import I18n from '../../utils/i18n';

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
    const { lecturer, group } = this.state;

    const data = {
      startDate: this.startDate.state.date,
      endDate: this.endDate.state.date,
      lecturer,
      group,
    };
    console.log(data);
  }

  switchTab(index) {
    this.setState({ selectedIndex: index });
  }

  renderDatePickers() {
    const { selectedIndex } = this.state;

    if (selectedIndex === 0) {
      return (
        <ListRow label={this.localize('Date')}>
          <DatePicker ref={(node) => { this.startDate = node; }} />
        </ListRow>
      );
    }
    return (
      <View>
        <ListRow label={this.localize('From')}>
          <DatePicker ref={(node) => { this.startDate = node; }} />
        </ListRow>
        <ListRow label={this.localize('To')}>
          <DatePicker ref={(node) => { this.endDate = node; }} />
        </ListRow>
      </View>
    );
  }

  renderTabs() {
    const { themedStyle } = this.props;
    const { selectedIndex } = this.state;

    return (
      <ListRow label={this.localize('Type')}>
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
      <View style={themedStyle.searchContainer}>
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
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
  searchContainer: {
    height: '100%',
    paddingTop: 15,
    backgroundColor: theme['background-basic-color-3'],
  },
  titleText: {
    color: theme['background-basic-color-2'],
  },
  indicatorStyle: {
    display: 'none',
  },
  tabContainer: {
    width: '80%',
    backgroundColor: theme['background-basic-color-1'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 5,
  },
  button: {
    marginTop: 25,
    width: '46%',
    marginLeft: '27%',
    backgroundColor: theme['background-basic-color-1'],
    borderWidth: 0,
  },
  input: {
    borderRadius: 10,
    width: '80%',
  },
  checkbox: {
    bgColor: theme['background-basic-color-1'],
  },
}));
