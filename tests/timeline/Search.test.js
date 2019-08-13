/* @jest-environment jsdom */

import React from 'react';
import { mount } from 'enzyme';

import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import api from '../../src/api/schedule';
import NavigationService from '../../src/navigation/NavigationService';
import schedule from './data';
import { themes } from '../../src/utils/themes';

import Search from '../../src/components/schedule/Search';

let lecturer, group, date, button;

describe('<Search> ', () => {
  beforeEach(() => {
    api.getSchedule = jest.fn(() => Promise.resolve(schedule[0]));
    NavigationService.navigate = jest.fn(() => Promise.resolve());

    const wrapper = mount(
      <ApplicationProvider mapping={mapping} theme={themes['Eva Light']}>
        <Search schedule={schedule} />
      </ApplicationProvider>,
    );

    lecturer = wrapper.find('.lecturer').last().find('FormInput').last();
    group = wrapper.find('#group').last().find('FormInput').last();
    date = wrapper.find('.date').last().find('DatePickerWrapper').last();
    button = wrapper.find('#search-button').last();
  });

  it('should render all form components', () => {
    expect(lecturer).toExist();
    expect(group).toExist();
    expect(date).toExist();
    expect(button).toExist();
  });

  it('should navigate no another page if data right', async () => {
    lecturer.setState({ value: 'Кушнір' });
    group.setState({ value: 'ПМ-41' });
    date.setState({ startDate: '05.09.2018', endDate: '12.08.2018' });
    button.simulate('click');

    await expect(api.getSchedule).toHaveBeenCalled();
    await expect(NavigationService.navigate).toHaveBeenCalled();
  });

  it('shound not navigate no another page if data wrong', async () => {
    button.simulate('click');

    await expect(api.getSchedule).not.toHaveBeenCalled();
  });
});
