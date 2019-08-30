import React, { PureComponent } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import moment from 'moment';
import Circle from './Circle';

const styles = {
  timeline: {
    paddingLeft: 25,
    height: '100%',
    alignItems: 'center',
    width: '10%',
    marginLeft: '0%',
  },
  lineWrapper: {
    flexDirection: 'column',
    position: 'absolute',
  },
  point: {
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
  },
};

/**
  * This class responsible for visualing and animating timeline.
  * Timeline is based on height of components(subjects, dates).
  * If you change margin/padding/height of this components, dont forget to
  * change their height in this class constructor too
*/
export default class Timeline extends PureComponent {
  static defaultProps = {
    schedule: [],
    activeColor: 'white',
    inactiveColor: 'black',
  }

  constructor(props) {
    super(props);

    // TODO: replace this with new Date()
    this.currentDate = moment();
    this.screenHeight = Dimensions.get('window').height;

    this.state = { animation: new Animated.Value(0) };

    this.refreshPadding = 300;
    this.duration = 3000;

    // circle
    this.circlesMargin = 24;
    this.circleSize = 10;

    // <Lesson /> height
    this.subjectHeight = 140;
    this.minSubjectHeight = 90;
    // <Day>'s titleWrapper height
    this.dateHeight = 40;

    this.startPosition = 0;

    this.addAnimationListener();
    this.updateData();
  }

  getPointsForTimeline(schedule, points = []) {
    let height = this.refreshPadding;
    const firstDate = schedule[0].date.clone();
    const lastDate = schedule[schedule.length - 1].date.clone();

    points.push({
      moment: firstDate.set({ hour: 0, minute: 0, second: 0 }), height,
    });

    height += this.circlesMargin;

    schedule.forEach((day, dayIndex) => {
      day.subjects.forEach((subject, subjectIndex) => {
        if (subjectIndex === 0) height += this.dateHeight;

        if (subjectIndex > 0 && day.subjects[subjectIndex - 1].time === subject.time) {
          height += this.minSubjectHeight;
        } else {
          if (dayIndex !== 0 || subjectIndex !== 0) height += this.subjectHeight;
          points.push({ moment: subject.momentTime, height });
        }
      });
    });

    const pageSize = this.screenHeight > height ? this.screenHeight + this.refreshPadding : height;
    height = pageSize + this.refreshPadding;

    points.push({
      moment: lastDate.set({ hour: 23, minute: 59, second: 59 }), height,
    });
    return points;
  }

  getProgressBarHeight() {
    if (this.currentDate > this.points[this.points.length - 1].moment) {
      return this.barHeight;
    }
    for (let i = 0; i < this.points.length - 1; i += 1) {
      const start = this.points[i];
      const end = this.points[i + 1];

      if (start.moment <= this.currentDate && end.moment > this.currentDate) {
        const hDiff = end.height - start.height;
        const tDiff = end.moment.diff(start.moment);
        const timePassed = this.currentDate.diff(start.moment);

        const time = timePassed > tDiff ? tDiff : timePassed;

        return Math.round((time / (tDiff / hDiff)) + start.height);
      }
    }

    return 0;
  }

  updateData() {
    const { schedule } = this.props;

    this.points = this.getPointsForTimeline(schedule);
    this.barHeight = this.points[this.points.length - 1].height;
    this.progressBarHeight = this.getProgressBarHeight();
    this.startPosition = this.progressBarHeight > this.refreshPadding ? this.refreshPadding - 1 : 0;
  }

  startAnimation() {
    const { animation } = this.state;

    Animated.timing(
      animation,
      {
        toValue: this.progressBarHeight,
        duration: this.progressBarHeight / this.barHeight * this.duration,
        // for Android systems only, it may not work without it
        perspective: 1000,
      },
    ).start();
  }

  resetAnimation() {
    const { animation } = this.state;

    animation.stopAnimation();
    animation.setValue(this.startPosition);

    for (let i = 0; i < this.points.length; i += 1) {
      const point = this.points[i];
      if (point.node) {
        point.node.setUnActive();
      }
    }
  }

  addAnimationListener() {
    const { animation } = this.state;

    animation.addListener((bar) => {
      const height = bar.value - this.circleSize / 2;

      // exclude first and last element, because they are not visible
      for (let i = 1; i < this.points.length - 1; i += 1) {
        const point = this.points[i];

        if (point.node && !point.node.state.active && point.height < height) {
          point.node.setActive();
        }
      }
    });
  }

  renderProgressBar() {
    const { activeColor } = this.props;
    const { animation } = this.state;


    const progressBarStyles = [styles.line, styles.activeLine, {
      height: animation,
      borderColor: activeColor,
    }];

    return (
      <Animated.View style={progressBarStyles} />
    );
  }

  renderCircles() {
    const circles = [];

    // exclude first and last element, because they are not visible
    for (let i = 1; i < this.points.length - 1; i += 1) {
      const point = this.points[i];

      const pointStyles = [styles.point, { marginTop: point.height }];

      circles.push(<Circle
        key={`${point.height}`}
        styles={pointStyles}
        ref={(node) => { this.points[i].node = node; }}
      />);
    }

    return circles;
  }

  render() {
    const { inactiveColor } = this.props;

    const timelineStyles = [styles.timeline, {
      marginTop: -this.refreshPadding,
    }];
    const barStyles = [styles.line, {
      height: this.barHeight,
      borderColor: inactiveColor,
    }];

    return (
      <View style={timelineStyles}>
        <View style={styles.lineWrapper}>
          <View style={barStyles} />
          { this.renderProgressBar() }
        </View>
        { this.renderCircles() }
      </View>
    );
  }
}
