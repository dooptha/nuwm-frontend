/* @jest-environment jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import schedule from './data';
import { Schedule } from '../../src/components/schedule';
import api from '../../src/api/schedule';

describe('Schedule', () => {
  it('should ser received data to state and end refreshing', async () => {
    api.getScheduleOnWeek = jest.fn(() => Promise.resolve(schedule[0]));

    const wrapper = await shallow(<Schedule themedStyle={{}} />);

    expect(wrapper.state().schedule).toBe(schedule[0]);
    expect(wrapper.state().refreshing).toBe(false);
  });

  it('should fetch data from server on mount', () => {
    const requestSchedule = jest.fn();
    Schedule.prototype.requestSchedule = requestSchedule;

    const wrapper = shallow(<Schedule themedStyle={{}} />);

    expect(requestSchedule).toHaveBeenCalled();
  });

  it('should fetch data from server on refresh', () => {
    const requestSchedule = jest.fn();
    Schedule.prototype.requestSchedule = requestSchedule;

    const wrapper = shallow(<Schedule themedStyle={{}} />);

    wrapper.instance().onRefresh();

    expect(wrapper.state().refreshing).toBe(true);
    expect(requestSchedule).toHaveBeenCalled();
  });

  it('should switch tab', () => {
    const wrapper = shallow(<Schedule themedStyle={{}} />);

    wrapper.instance().changeTab(2);

    expect(wrapper.state().selectedIndex).toBe(2);
  });
});
