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
    this.updateTime();
    this.screenHeight = Dimensions.get('window').height;

    this.state = { animation: new Animated.Value(0), ready: false };

    this.refreshPadding = 300;

    // circle
    this.circlesMargin = 24;
    this.circleSize = 12;

    // <Lesson /> height
    this.subjectHeight = 150;
    this.minSubjectHeight = 90;
    // <Day>'s titleWrapper height
    this.dateHeight = 40;

    this.startPosition = 0;

    this.addAnimationListener();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getPointsForTimeline(fDate, lDate, lessons, points = []) {
    let height = this.refreshPadding;
    const firstDate = fDate.clone();
    const lastDate = lDate.clone();

    height -= this.circleSize;

    points.push({
      moment: firstDate.set({ hour: 0, minute: 0, second: 0 }), height,
    });

    for (let i = 0; i < lessons.length; i += 1) {
      const { hasTime, hasDate } = lessons[i];

      if (i !== 0) {
        height += lessons[i - 1].height;
      }

      if (hasDate) height += 40;

      if (hasTime) {
        points.push({ moment: lessons[i].time, height: height + 31 });
      }
    }

    const pageSize = this.screenHeight + this.refreshPadding > height
      ? this.screenHeight + this.refreshPadding : height;
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

  updateTime() {
    this.currentDate = moment(new Date('2019-09-06T14:00:00'));
  }

  startTimer() {
    const { animation } = this.state;

    this.interval = setInterval(() => {
      this.updateTime();
      this.progressBarHeight = this.getProgressBarHeight();
      animation.setValue(this.progressBarHeight);
      this.forceUpdate();
    }, 60000);
  }

  resetTimer() {
    clearInterval(this.interval);
  }

  updateData(firstDate, lastDate, lessons) {
    this.points = this.getPointsForTimeline(firstDate, lastDate, lessons);
    this.barHeight = this.points[this.points.length - 1].height;

    this.setState({ ready: true }, () => {
      this.forceUpdate();
      this.resetAnimation();
      this.startAnimation();
    });
  }

  startAnimation() {
    const { animation, ready } = this.state;

    this.resetTimer();

    if (ready) {
      this.updateTime();
      this.progressBarHeight = this.getProgressBarHeight();
      this.startPosition = this.progressBarHeight > this.refreshPadding
        ? this.refreshPadding - 1 : 0;

      Animated.timing(
        animation,
        {
          toValue: this.progressBarHeight,
          duration: this.progressBarHeight * 2,
          // for Android systems only, it may not work without it
          perspective: 1000,
        },
      ).start(() => this.startTimer());
    }
  }

  resetAnimation() {
    const { animation, ready } = this.state;
    if (ready) {
      animation.stopAnimation();
      animation.setValue(this.startPosition);

      for (let i = 1; i < this.points.length - 1; i += 1) {
        if (this.nodes[i]) {
          this.nodes[i].setUnActive();
        }
      }
    }
  }

  addAnimationListener() {
    const { animation } = this.state;

    animation.addListener((bar) => {
      const height = bar.value;

      // exclude first and last element, because they are not visible
      for (let i = 1; i < this.points.length - 1; i += 1) {
        const point = this.points[i];
        if (this.nodes[i] && !this.nodes[i].state.active && point.height <= height) {
          this.nodes[i].setActive();
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
    this.nodes = [];

    // exclude first and last element, because they are not visible
    for (let i = 1; i < this.points.length - 1; i += 1) {
      const point = this.points[i];

      if (point) {
        const pointStyles = [styles.point, { marginTop: point.height }];
        circles.push(<Circle
          key={`${point.height}`}
          styles={pointStyles}
          ref={(n) => { this.nodes[i] = n; }}
        />);
      }
    }

    return circles;
  }

  render() {
    const { inactiveColor } = this.props;
    const { ready } = this.state;

    const timelineStyles = [styles.timeline, {
      marginTop: -this.refreshPadding,
    }];
    const barStyles = [styles.line, {
      height: this.barHeight,
      borderColor: inactiveColor,
    }];

    return ready ? (
      <View style={timelineStyles}>
        <View style={styles.lineWrapper}>
          <View style={barStyles} />
          { this.renderProgressBar() }
        </View>
        { this.renderCircles() }
      </View>
    ) : (
      <View style={timelineStyles}>
        <View style={styles.lineWrapper}>
          <View style={[barStyles, { height: 2000 }]} />
        </View>
      </View>
    );
  }
}
