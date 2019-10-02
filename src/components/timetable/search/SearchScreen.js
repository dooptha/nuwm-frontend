import React, { Component } from 'react';
import { View } from 'react-native';

const styles = {
  calendar: {
    backgroundColor: 'green',
    height: '30%',
  },
  schedule: {
    backgroundColor: 'red',
    height: '50%',
  }
};

const Timetable = () => {

  return (
    <View>
      <View style={styles.calendar}></View>
      <View style={styles.schedule}></View>
    </View>
  )
}

export default Timetable;
