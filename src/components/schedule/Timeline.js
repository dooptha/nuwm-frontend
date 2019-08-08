import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import moment from 'moment';

class Timeline extends Component {
  constructor(props) {
    super(props);

    // line
    this.lineTopSize = 300;
    this.lineBottomSize = 600;

    // circle
    this.circlesMargin = 30;
    this.circleMargin = 70;

    this.subjectHeight = 130;
    this.dateHeight = 40;
  }

  splitSchedule(schedule) {
    const { themedStyle } = this.props;

    this.intervals = [];
    this.moments = [];

    this.moments.push({
      moment: this.currentDate.clone().set({
        hour: 0,
        minute: 0,
        second: 0,
      }),
      height: this.barHeight,
    });

    this.barHeight += this.circlesMargin;

    schedule.forEach((day, dayIndex) => {
      day.subjects.forEach((subject, subjectIndex) => {
        if (subjectIndex === 0) {
          this.barHeight += this.dateHeight;
        }

        if (!(dayIndex === 0 && subjectIndex === 0)) {
          this.barHeight += this.subjectHeight;
        }

        this.moments.push({ moment: subject.momentTime, height: this.barHeight });
      });
    });

    this.barHeight += this.lineBottomSize;

    this.moments.push({
      moment: this.currentDate.clone().set({
        hour: 23,
        minute: 59,
        second: 59,
      }),
      height: this.barHeight,
    });

    for (let i = 0; i < this.moments.length - 1; i += 1) {
      this.intervals.push({
        start: {
          moment: this.moments[i].moment,
          height: this.moments[i].height,
        },
        end: {
          moment: this.moments[i + 1].moment,
          height: this.moments[i + 1].height,
        },
      });
    }
  }

  drawLine() {
    const { themedStyle } = this.props;

    let height = 0;

    for (let i = 0; i < this.intervals.length; i += 1) {
      const { start, end } = this.intervals[i];

      if (start.moment <= this.currentDate && end.moment > this.currentDate) {
        const heightDiff = end.height - start.height;
        const timeDiff = end.moment.diff(start.moment);
        const timePassed = this.currentDate.diff(start.moment);

        height = Math.round(timePassed / (timeDiff / heightDiff) + start.height);
      }
    }

    const styles = [themedStyle.line, themedStyle.activeLine, {
      height,
    }];

    return (
      <View style={styles} />
    );
  }

  renderCircles() {
    const { themedStyle } = this.props;

    const circles = [];

    for (let i = 1; i < this.moments.length - 1; i += 1) {
      const styles = [themedStyle.circle];

      styles.push({
        marginTop: this.moments[i].height,
      });

      if (this.currentDate > this.moments[i].moment) {
        styles.push(themedStyle.active);
      } else {
        styles.push(themedStyle.unactive);
      }

      circles.push(<View key={`${this.moments[i].height}`} style={styles} />);
    }

    return circles;
  }

  render() {
    const { themedStyle, schedule } = this.props;

    // TODO: replace this with new Date()
    this.currentDate = moment('2018-09-06 10:00:00');

    this.barHeight = this.lineTopSize;

    this.splitSchedule(schedule);

    const circles = this.renderCircles();

    return (
      <View style={[themedStyle.timeline, { marginTop: -this.lineTopSize }]}>
        <View style={themedStyle.lineWrapper}>
          <View style={[themedStyle.line, themedStyle.unactiveLine, {
            height: this.barHeight,
          }]}
          />
          { this.drawLine()}
        </View>
        <View style={{ alignItems: 'center' }}>
          { circles }
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
  circle: {
    position: 'absolute',
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  lineWrapper: {
    height: '80%',
    flexDirection: 'column',
    position: 'absolute',
  },
  line: {
    width: 1,
    borderWidth: 1.5,
  },
  activeLine: {
    position: 'absolute',
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
