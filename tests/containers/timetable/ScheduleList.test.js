/* @jest-environment jsdom */

import React from 'react';
import { mount } from 'enzyme';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { themes } from '../../../src/utils/themes';
import schedule from './data';
import ScheduleList from '../../../src/components/timetable/Schedule';
import Day from '../../../src/components/timetable/Day';

describe('ScheduleList ', () => {
  it('should render one <Day />', () => {
    const wrapper = mount(
      <ApplicationProvider mapping={mapping} theme={themes['Eva Light']}>
        <ScheduleList schedule={schedule} />
      </ApplicationProvider>,
    );

    expect(wrapper.find(Day).length).toBe(1);
  });
});
