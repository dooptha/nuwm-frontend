/* @jest-environment jsdom */

import React from 'react';
// import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import ScheduleList from '../../src/components/schedule/ScheduleList';
import Day from '../../src/components/schedule/Day';

const schedule = [{
  date: '05.09.2018',
  dayName: 'Середа',
  day: 2,
  dayOfYear: 248,
  subjects: [{
    classroom: '441',
    group: 'ПМ-41, ІНФ-41',
    lecturer: 'Герус Володимир Андрійович',
    lesson: 2,
    name: 'Комп`ютерні мережі та їх адміністрування',
    time: '09:40-11:00',
    type: 'Лекція',
  }],
}];

describe('<Foo />', () => {
  it('allows us to set props', () => {
    console.log('OMG');
    const wrapper = mount(
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}
      >
        <ScheduleList />
      </ApplicationProvider>,
    );
    expect(1).to.equal(1);
  });
});
