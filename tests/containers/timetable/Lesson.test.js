/* @jest-environment jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import schedule from './data';
import Lesson from '../../../src/components/timetable/Lesson';
import NavigationService from '../../../src/navigation/NavigationService';

describe('<Lesson> ', () => {
  it('should navigate to DetailedLesson after been pressed', () => {
    const navigate = jest.fn();
    NavigationService.navigate = navigate;

    const wrapper = shallow(
      <Lesson subject={schedule[0].subjects[0]} themedStyle={{}} />,
    );

    wrapper.instance().onPress();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate.mock.calls[0][0]).toBe('DetailedLesson');
  });
});
