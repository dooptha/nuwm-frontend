import React, { Component, PureComponent } from 'react';
import { ScrollView } from 'react-native';
import I18n from '../../../utils/i18n';

import Schedule from '../Schedule';

export default class SearchScreen extends PureComponent {
  render() {
    const { navigation, error } = this.props;
    const { state: { params } } = navigation;
    const { schedule } = params;

    return (
      <ScrollView>
        <Schedule
          schedule={schedule}
          message={error || I18n.t('timetable.no-lesson')}
          active
        />
      </ScrollView>
    );
  }
}
