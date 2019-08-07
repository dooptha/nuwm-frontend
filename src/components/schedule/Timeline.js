import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';

class Timeline extends Component {
  state = {

  }

  drawCircles(schedule) {
    const { themedStyle } = this.props;

    const circles = [];

    schedule.forEach((day, i) => {
      day.subjects.forEach((subject, index) => {
        circles.push((<View style={[themedStyle.circle, (index == 0 && i == 0) ? themedStyle.unactive : themedStyle.active, { marginTop: index === 0 ? 160 : 120 }]} />));
      });
    });

    return circles;
  }

  drawLine(style) {
    const { themedStyle } = this.props;

    const finalStyle = [themedStyle.line, style];

    return (
      <View style={finalStyle} />
    );
  }

  render() {
    const { themedStyle, length, schedule } = this.props;

    return (
      <View style={themedStyle.timeline}>
        <View style={themedStyle.lineWrapper}>
          { this.drawLine(themedStyle.unactiveLine) }
          { this.drawLine(themedStyle.activeLine) }
        </View>
        <View style={themedStyle.circles}>
          { this.drawCircles(schedule) }
        </View>
      </View>
    );
  }
}

export default withStyles(Timeline, (theme) => ({
  timeline: {
    height: '100%',
    marginLeft: '5%',
    marginRight: '2.5%',
    alignItems: 'center',
  },
  circles: {
    marginTop: -90,
  },
  circle: {
    marginTop: 70,
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
  },
  lineWrapper: {
    height: '80%',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: -300,
  },
  line: {
    width: 1,
    borderWidth: 1.5,
    height: '100%',
  },
  activeLine: {
    borderColor: theme['color-info-400'],
  },
  unactiveLine: {
    borderColor: theme['color-basic-500'],
  },
  unactive: {
    backgroundColor: theme['color-basic-500'],
  },
  active: {
    backgroundColor: theme['color-info-400'],
  },
}));
