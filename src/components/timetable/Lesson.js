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
      showTime,
      index,
      watchLessons,
      hasDate,
      subject: {
        time,
        momentTime,
        shortInfo,
        shortClassroom,
        name,
      },
    } = this.props;

    const timeWrapper = showTime ? (
      <View style={themedStyle.separateTime}>
        <View style={themedStyle.subRow}>
          { ClockOutlineIcon(themedStyle.icon) }
          <Text style={themedStyle.title}>{ time }</Text>
        </View>
      </View>
    ) : null;

    const wrapperStyles = [
      themedStyle.wrapper,
      isLastItem ? themedStyle.bottomLine : {},
      showTime ? themedStyle.topLine : {},
    ];

    return (
      <TouchableOpacity
        onLayout={(e) => watchLessons({
          height: e.nativeEvent.layout.height, hasDate, hasTime: showTime, time: momentTime,
        }, index)}
        style={wrapperStyles}
        onPress={() => this.onPress()}
      >
        { timeWrapper }
        <View style={themedStyle.subjectRow}>
          <Text style={themedStyle.button}>{ shortClassroom || '-' }</Text>
          <View style={themedStyle.descWrapper}>
            <Text style={themedStyle.desc}>{ name }</Text>
            <Text style={themedStyle.subdesc}>{ shortInfo }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// if you are changing height(margin/padding/height), dont forget to change
// them in <Timeline> constructor too
export default withStyles(Lesson, (theme) => ({
  wrapper: {
    paddingBottom: 15,
    paddingTop: 5,
    paddingRight: 10,
  },
  subjectColumn: {
    height: 130,
    flexDirection: 'column',
  },
  subjectRow: {
    flexDirection: 'row-reverse',
  },
  topLine: {
    paddingTop: 15,
    borderTopColor: theme['background-basic-color-3'],
    borderTopWidth: 1,
  },
  bottomLine: {
    borderBottomColor: theme['background-basic-color-3'],
    borderBottomWidth: 1,
    paddingBottom: 20,
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
  separateTime: {
    paddingBottom: 15,
  },
  button: {
    paddingTop: 7,
    paddingBottom: 7,
    height: 32,
    backgroundColor: theme['background-primary-color-1'],
    color: 'white',
    borderRadius: 15,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descWrapper: {
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1,
    paddingRight: 10,
  },
  desc: {
    color: theme['background-alternative-color-4'],
  },
  subdesc: {
    paddingTop: 5,
    color: theme['text-hint-color'],
  },
}));