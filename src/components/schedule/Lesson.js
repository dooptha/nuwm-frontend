import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'react-native-ui-kitten';
import { View, Text, TouchableOpacity } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { ClockOutlineIcon } from '../../assets/icons';

/**
  * Displays short information about one lessons
*/
class Lesson extends Component {
  static propTypes = {
    subject: PropTypes.shape({
      classroom: PropTypes.string,
      time: PropTypes.string,
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    subject: {
      classroom: '-',
      time: '-',
      name: '-',
    },
  }

  onPress() {
    const { subject } = this.props;
    NavigationService.navigate('DetailedLesson', { subject });
  }

  render() {
    const {
      themedStyle,
      isLastItem,
      subject: {
        classroom,
        time,
        type,
        name,
      },
    } = this.props;

    console.log(isLastItem);

    const wrapperStyles = [themedStyle.column,
      isLastItem ? themedStyle.line : {}];

    return (
      <TouchableOpacity style={wrapperStyles} onPress={() => this.onPress()}>
        <View style={themedStyle.row}>
          <View style={themedStyle.subRow}>
            { ClockOutlineIcon(themedStyle.icon) }
            <Text style={themedStyle.title}>{ time }</Text>
          </View>
          <Text style={themedStyle.button}>{ classroom }</Text>
        </View>
        <Text style={themedStyle.desc}>{ name }</Text>
        <Text style={themedStyle.subdesc}>{ type }</Text>
      </TouchableOpacity>
    );
  }
}

// if you are changing height(margin/padding/height), dont forget to change
// them in <Timeline> constructor too
export default withStyles(Lesson, (theme) => ({
  column: {
    paddingRight: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    height: 130,
    borderTopColor: theme['text-hint-color'],
    borderTopWidth: 0.5,
  },
  line: {
    borderBottomColor: theme['text-hint-color'],
    borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 8,
    tintColor: theme['text-basic-color'],
  },
  title: {
    fontWeight: 'bold',
    color: theme['text-basic-color'],
  },
  button: {
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: theme['background-primary-color-1'],
    color: 'white',
    borderRadius: 15,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    color: theme['background-alternative-color-4'],
  },
  subdesc: {
    paddingLeft: 0,
    paddingTop: 5,
    color: theme['text-hint-color'],
  },
}));
