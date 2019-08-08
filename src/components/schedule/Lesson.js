import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, withStyles } from 'react-native-ui-kitten';
import { View, Text } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { ClockOutlineIcon } from '../../assets/icons';

class Lesson extends Component {
  static defaultProps = {
    subject: {
      classroom: '-',
      time: '-',
      name: '-',
    },
  }

  onPress() {
    const { subject } = this.props;
    NavigationService.navigate('DetailedLesson',
      { subject });
  }

  render() {
    const {
      themedStyle,
      subject: {
        classroom,
        lecturer,
        subgroup,
        streams_type,
        lessonNum,
        time,
        type,
        name,
      },
    } = this.props;

    return (
      <View style={themedStyle.column}>
        <View style={themedStyle.row}>
          <View style={themedStyle.subRow}>
            { ClockOutlineIcon(themedStyle.icon) }
            <Text style={themedStyle.title}>{ time }</Text>
          </View>
          <Text style={themedStyle.button}>{ classroom }</Text>
        </View>
        <Text style={themedStyle.desc}>{ name }</Text>
        <Text style={themedStyle.subdesc}>{ type }</Text>
      </View>
    );
  }
}

export default withStyles(Lesson, (theme) => ({
  column: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomColor: theme['color-basic-400'],
    borderTopColor: theme['color-basic-400'],
    width: '100%',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    height: 130,
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
    // color: theme['color-basic-700'],
  },
  title: {
    fontWeight: 'bold',
    color: theme['color-basic-700'],
  },
  button: {
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: theme['color-info-400'],
    color: 'white',
    borderRadius: 15,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    color: theme['color-basic-700'],
  },
  subdesc: {
    paddingLeft: 20,
    paddingTop: 5,
    color: theme['color-basic-600'],
  },
}));

Lesson.propTypes = {
  subject: PropTypes.shape({
    classroom: PropTypes.string,
    time: PropTypes.string,
    name: PropTypes.string,
  }),
};
