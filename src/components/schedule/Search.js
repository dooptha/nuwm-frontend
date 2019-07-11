import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Button, withStyles, BottomNavigation, BottomNavigationTab, Input, CheckBox, Text, Toggle,
} from 'react-native-ui-kitten';
import DatePicker from './DatePicker';
import ListRow from './ListRow';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      lecturer: '',
      group: '',
      showOnlyLabs: false,
    };
  }

  changeTab(index) {
    console.log(index);
    this.setState({ selectedIndex: index });
  }

  render() {
    const {
      selectedIndex, lecturer, group, showOnlyLabs,
    } = this.state;
    const { themedStyle } = this.props;

    const body = selectedIndex === 0
      ? (
        <ListRow label="Дата">
          <DatePicker ref={(node) => { this.startDate = node; }} />
        </ListRow>
      )
      : (
        <View>
          <ListRow label="Від">
            <DatePicker ref={(node) => { this.startDate = node; }} />
          </ListRow>
          <ListRow label="До">
            <DatePicker ref={(node) => { this.endDate = node; }} />
          </ListRow>
        </View>
      );

    return (
      <View style={themedStyle.searchContainer}>
        <ListRow label="Тип">
          <BottomNavigation
            style={themedStyle.tabContainer}
            selectedIndex={selectedIndex}
            onSelect={(index) => this.changeTab(index)}
            indicatorStyle={themedStyle.indicatorStyle}
          >
            <BottomNavigationTab title="Лише один день" selected />
            <BottomNavigationTab title="Проміжок" />
          </BottomNavigation>
        </ListRow>
        { body }

        <ListRow label="Викладач">
          <Input
            style={themedStyle.input}
            value={lecturer}
            placeholder="Приклад: Мічута Ольга Вікторівна"
            onChangeText={(value) => { this.setState({ lecturer: value }); }}
          />
        </ListRow>

        <ListRow label="Группа">
          <Input
            value={group}
            style={themedStyle.input}
            placeholder="Приклад: ПМ-41"
            onChangeText={(value) => { this.setState({ group: value }); }}
          />
        </ListRow>

        <ListRow label="Тільки практика">
          <Toggle
            style={themedStyle.checkbox}
            checked={showOnlyLabs}
            onChange={(state) => { this.setState({ showOnlyLabs: state }); }}
          />
        </ListRow>

        <Button style={themedStyle.button} onPress={() => this.onPress()}>Знайти</Button>
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
