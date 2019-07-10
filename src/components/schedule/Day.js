import React, { Component } from 'react';
import { View } from 'react-native';
import Lesson from './Lesson';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAllSubjects() {
    const { day } = this.props;

    return day.subjects.map((subject) => (
      <Lesson
        key={subject.day}
        subject={subject}
      />
    ));
  }

  render() {
    const { day } = this.props;
    const body = day.subjects.length > 0 ? this.renderAllSubjects() : null;

    return (
      <View>
        { body }
      </View>
    );
  }
}
