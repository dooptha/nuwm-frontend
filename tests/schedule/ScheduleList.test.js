/* @jest-environment jsdom */

import React from 'react';
import { mount } from 'enzyme';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import themes from '../../src/utils/themes';
import schedule from './data';
import ScheduleList from '../../src/components/schedule/ScheduleList';
import Day from '../../src/components/schedule/Day';

describe('ScheduleList ', () => {
  it('should render one <Day />', () => {
    jest.mock('react-native-ui-kitten', { withStyles: () => {} });
    jest.mock('react-native-ui-kitten/theme/style/styleConsumer.component.js', {});

    const wrapper = mount(
      <ApplicationProvider mapping={mapping} theme={themes['Eva Light']}>
        <ScheduleList schedule={schedule} />
      </ApplicationProvider>,
    );

    expect(wrapper.find(Day).length).toBe(1);
  });
});
