import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';
import moment from 'moment';
import Circle from './Circle';

class Timeline extends Component {
  static defaultProps = {
    schedule: [],
  }

  state = {
    animation: new Animated.Value(0),
  }

  constructor(props) {
    super(props);

    // TODO: replace this with new Date()
    this.currentDate = moment('2018-09-06 10:00:00');

    console.log('Screen height ', Dimensions.get('window').height);

    this.screenHeight = Dimensions.get('window').height;

    // line
    this.refreshPadding = 300;

    // circle
    this.circlesMargin = 30;
    this.circleSize = 10;

    this.subjectHeight = 130;
    this.dateHeight = 40;

    this.progressBarHeight = 0;
    this.barHeight = 0;

    this.startPosition = 0;

    this.intervals = [];
    this.moments = [];

    this.addAnimationListener();
  }

  componentDidMount() {
    this.animateBar();
  }

  componentWillUpdate() {
    this.resetAnimation();
  }

  componentDidUpdate() {
    this.animateBar();
  }

  animateBar() {
    const { animation } = this.state;

    Animated.timing(
      animation,
      {
        toValue: this.progressBarHeight,
        duration: 2000,
        perspective: 1000,
      },
    ).start();
  }

  resetAnimation() {
    const { animation } = this.state;

    animation.stopAnimation();
    animation.setValue(this.startPosition);

    for (let i = 1; i < this.moments.length - 1; i += 1) {
      this.moments[i].node.setUnActive();
    }
  }

  /**
   * if progress bar height is equal to the circle position - make it active
   */
  addAnimationListener() {
    const { animation } = this.state;

    animation.addListener((bar) => {
      const height = bar.value - this.circleSize / 2;

      // exclude first and last element, because they are not visible
      for (let i = 1; i < this.moments.length - 1; i += 1) {
        if (this.moments[i].node && !this.moments[i].node.state.active) {
          if (this.moments[i].height < height) {
            this.moments[i].node.setActive();
          }
        }
      }
    });
  }

  splitSchedule(schedule) {
    const { themedStyle } = this.props;

    this.intervals = [];
    this.moments = [];

    this.barHeight = this.refreshPadding;

    this.moments.push({
      moment: schedule[0].date.clone().set({
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

    const padding = this.screenHeight + 2 * this.refreshPadding - this.barHeight;

    this.barHeight += padding;

    this.moments.push({
      moment: schedule[schedule.length - 1].date.clone().set({
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
    const { animation } = this.state;

    let height = 0;

    if (this.currentDate > this.intervals[this.intervals.length - 1].end.moment) {
      height = this.barHeight;
    } else {
      for (let i = 0; i < this.intervals.length; i += 1) {
        const { start, end } = this.intervals[i];

        if (start.moment <= this.currentDate && end.moment > this.currentDate) {
          const heightDiff = end.height - start.height;
          const timeDiff = end.moment.diff(start.moment);
          const timePassed = this.currentDate.diff(start.moment);

          console.log(heightDiff, timeDiff, timePassed);

          const time = timePassed > timeDiff ? timeDiff : timePassed;

          height = Math.round((time / (timeDiff / heightDiff)) + start.height);
        }
      }
    }

    console.log(this.intervals);

    const styles = [themedStyle.line, themedStyle.activeLine, {
      height: animation,
    }];

    this.progressBarHeight = height;

    this.startPosition = height > this.refreshPadding ? this.refreshPadding : 0;

    console.log('Progress bar height = ', this.progressBarHeight);

    return (
      <Animated.View style={styles} />
    );
  }

  renderCircles() {
    const { themedStyle } = this.props;
    const circles = [];

    // exclude first and last element, because they are not visible
    for (let i = 1; i < this.moments.length - 1; i += 1) {
      const styles = [
        themedStyle.circle,
        { marginTop: this.moments[i].height },
      ];

      circles.push(<Circle
        key={`${this.moments[i].height}`}
        styles={styles}
        ref={(node) => { this.moments[i].node = node; }}
      />);
    }

    return circles;
  }

  render() {
    const { themedStyle, schedule } = this.props;

    console.log(schedule);

    this.splitSchedule(schedule);

    const circles = this.renderCircles();

    console.log('Bar height = ', this.barHeight);

    return (
      <View style={[themedStyle.timeline, {
        marginTop: -this.refreshPadding,
      }]}
      >
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
}));
