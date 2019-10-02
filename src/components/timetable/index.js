import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, Animated, Easing, ScrollView, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DatePicker from 'rn-lightweight-date-picker';
import { ArrowUpIcon } from '../../assets/icons';

const linesColor = '#e0e0e0';
const calendarMinSize = 0.85, calendarMaxSize = 1;
const scheduleMinHeight = 0.45, scheduleMaxHeight = 0.97;
const minSpeedToForce = 2;

const styles = {
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  calendar: {
    top: 0,
    selfAling: 'flex-start',
    position: 'absolute',
    height: '70%',
    width: '100%',
    backgroundColor: 'white',
  },
  schedule: {
    backgroundColor: 'white',
    height: '5%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
};

const subjects = {
  time: ["8:00-9:20", "9:40-11:00", "11:15-12:35", "13:00-14:00"],
  classroom: ["410", "127", "256a", "228"],
  name: ["Функціональний аналіз", "Фізична підготовка", "Майнкрафт", "Математична залупа", "ОБЖ", "Інформатика", "Трансгуманізм", "Теорія керування"],
  type: ["Лабораторна робота", "Практична робота", "Лекція"],
};

const heightValues = {
  inputRange: [0, 1],
  outputRange: ['0%', '100%'],
};

const rotateValues = {
  inputRange: [0, 180],
  outputRange: ['0deg', '100deg'],
};

const Subject = (props) => {

  const time = subjects.time[Math.floor((Math.random() * subjects.time.length))];
  const classroom = subjects.classroom[Math.floor((Math.random() * subjects.classroom.length))];
  const name = subjects.name[Math.floor((Math.random() * subjects.name.length))];
  const type = subjects.type[Math.floor((Math.random() * subjects.type.length))];

  const times = time.split('-');

  return (
    <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 12 }}>
      <View style={{ flexDirection: 'column', width: '30%' }}>
        <Text style={{ marginBottom: 7 }}>{ times[0] + " " + times[1] }</Text>
        <Text style={{ color: 'gray' }}>{ classroom }</Text>
      </View>
      <View style={[{ flexDirection: 'column', width: '100%', paddingBottom: 12 }, !props.last ? { borderBottomColor: linesColor, borderBottomWidth: 0.5 } : {}]}>
        <Text style={{ fontWeight: 'bold', marginBottom: 7 }}>{ name }</Text>
        <Text style={{ color: 'gray', paddingLeft: 2 }}>{ type }</Text>
      </View>

    </View>
  );
};

const Date = (props) => {

  return (
    <View style={[{ borderBottomColor: linesColor, borderBottomWidth: 0.5, marginLeft: 20, paddingBottom: 13, paddingTop: 13 }, props.first ? {} : { borderTopColor: linesColor, borderTopWidth: 0.5 }]}>
      <Text style={{ color: '#9c9a9a' }}>{ "Friday, " + props.d + " September" }</Text>
    </View>
  )
};

const List = (props = { count: 0, d: 1 }) => {
  const list = [];

  const count = Math.floor(Math.random() * 4 + 1);

  for (let i = 0; i < count; i += 1) {
    list.push(<Subject last={count - 1 === i} />);
  }

  return (
    <View>
      <Date d={props.d} first={props.first} />

      { list }
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const swipeHeight = 0;

const Timetable = () => {

  const [isMinimized, setMinimized] = useState(false);
  const [animatedHeight, setAnimatedheight] = useState(new Animated.Value(scheduleMinHeight));
  const [animatedScaleX, setAnimatedScaleX] = useState(new Animated.Value(1));
  const [date, setDate] = useState(1);
  const [flip, setFlip] = useState(new Animated.Value(1));

  let swipping = false;

  const animate = (value, height) => {

    const speed = Math.abs(value - height) / (scheduleMaxHeight - scheduleMinHeight) * 350;

    console.log(speed)

    Animated.timing(
      animatedHeight,
      {
        toValue: value,
        duration: speed,
      },
    ).start();

    Animated.timing(
      animatedScaleX,
      {
        toValue: value === scheduleMaxHeight ? calendarMinSize : calendarMaxSize,
        duration: speed,
      },
    ).start();

    if (value === scheduleMaxHeight) {
      Animated.timing(
        flip,
        {
          toValue: 360,
          duration: 500,
        },
      ).start();
    } else {
      Animated.timing(
        flip,
        {
          toValue: 0,
          duration: 500,
        },
      ).start();
    }
  };

  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('start');
        swipping = true;
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('released');

        if (swipping) {
          const { moveY } = gestureState;
          const height = 1 - moveY / screenHeight;

          if (Math.abs(height - scheduleMinHeight) > Math.abs(height - scheduleMaxHeight)) {
            console.log('to up');
            animate(scheduleMaxHeight, height);
          } else {
            console.log('to down');
            animate(scheduleMinHeight, height);
          }
        }

        swipping = false;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { vy } = gestureState;
        const height = 1 - gestureState.moveY / screenHeight;

        if (swipping) {
          if (vy > minSpeedToForce) {
            console.log('force down');
            animate(scheduleMinHeight, height);
            swipping = false;
          } else if (vy < -minSpeedToForce) {
            console.log('force up');
            animate(scheduleMaxHeight, height);
            swipping = false;
          } else {
            animatedHeight.setValue(height);

            if (height >= scheduleMinHeight && height <= scheduleMaxHeight) {
              const h = 1 - (height - scheduleMinHeight) * (calendarMaxSize - calendarMinSize) / (scheduleMaxHeight - scheduleMinHeight);
              animatedScaleX.setValue(h);
            }
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    })
  );

  const onDate = (d) => {
    setDate(parseInt(d));
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.calendar, { transform: [{ scale: animatedScaleX }] }]}>
        <DatePicker onDateChange={onDate} format="d" mode="single" />
      </Animated.View>
      <Animated.View style={[styles.schedule, { height: animatedHeight.interpolate(heightValues) }]}>
        <View {...panResponder.panHandlers}>
          <TouchableOpacity style={{ marginTop: 5, height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Animated.View style={{ transform: [{ rotateX: flip.interpolate(rotateValues) }] }}>
              { ArrowUpIcon({ width: 40, height: 15, tintColor: linesColor }) }
            </Animated.View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <List count={20} d={date} first />
          <List count={20} d={date + 1} />
        </ScrollView>
      </Animated.View>
    </View>
  )
}

export default Timetable;
