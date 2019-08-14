import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';
import moment from 'moment';
import Circle from './Circle';

/**
  * This class responsible for visualing and animating timeline.
  * Timeline is based on height of components(subjects, dates).
  * If you change margin/padding/height of this components, dont forget to
  * change their height in this class constructor too
*/
class Timeline extends Component {
  static propTypes = {
    /** array of days with subjects */
    schedule: PropTypes.array,
  }

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

    this.screenHeight = Dimensions.get('window').height;

    // circle
    this.circlesMargin = 30;
    this.circleSize = 10;

    // <Lesson /> height
    this.subjectHeight = 130;
    // <Day>'s titleWrapper height
    this.dateHeight = 40;

    // bar
    this.progressBarHeight = 0;
    this.barHeight = 0;
    this.startPosition = 0;
    this.refreshPadding = 300;

    this.intervals = [];
    this.moments = [];

    this.addAnimationListener();
  }

  componentDidUpdate() {
    const { props: { activeTab, tabIndex }, state: { animation } } = this;

    if (activeTab === tabIndex) {
      this.animateBar();
    } else if (animation._value !== this.startPosition) {
      this.resetAnimation();
    }
  }

  animateBar() {
    const { animation } = this.state;

    Animated.timing(
      animation,
      {
        toValue: this.progressBarHeight,
        duration: this.progressBarHeight / this.barHeight * 3000,
        // for Android systems only, it may not work without it
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

  /**
   * here we parse our schedule and divide it into intervals
   */
  splitSchedule(schedule) {
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

  renderProgressBar() {
    const { props: { themedStyle }, state: { animation } } = this;

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

          const time = timePassed > timeDiff ? timeDiff : timePassed;

          height = Math.round((time / (timeDiff / heightDiff)) + start.height);
        }
      }
    }

    const styles = [themedStyle.line, themedStyle.activeLine, {
      height: animation,
    }];

    this.progressBarHeight = height;
    this.startPosition = height > this.refreshPadding ? this.refreshPadding : 0;

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
    const { themedStyle, schedule, style } = this.props;

    this.splitSchedule(schedule);

    const circles = this.renderCircles();

    return (
      <View style={[themedStyle.timeline, style, {
        marginTop: -this.refreshPadding,
      }]}
      >
        <View style={themedStyle.lineWrapper}>
          <View style={[themedStyle.line, themedStyle.unactiveLine, {
            height: this.barHeight,
          }]}
          />
          { this.renderProgressBar()}
        </View>
        { circles }
      </View>
    );
  }
}

export default withStyles(Timeline, (theme) => ({
  timeline: {
    paddingLeft: 25,
    height: '100%',
    alignItems: 'center',
  },
  lineWrapper: {
    flexDirection: 'column',
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  line: {
    width: 1,
    borderWidth: 1.5,
  },
  activeLine: {
    position: 'absolute',
    borderColor: theme['background-primary-color-1'],
  },
  unactiveLine: {
    borderColor: theme['border-basic-color-5'],
  },
}));
