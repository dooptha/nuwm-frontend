/* @jest-environment jsdom */

import React from 'react';
import { shallow } from 'enzyme';

import { FormInput } from '../../../src/components/schedule/common/Form/Input';

describe('<Lesson> ', () => {
  it('should switch status to primary if entering text', () => {
    const wrapper = shallow(
      <FormInput themedStyle={{}} />,
    );

    wrapper.setState({ status: 'danger' });
    wrapper.instance().onChange('qwe');

    expect(wrapper.state().status).toBe('primary');
  });
});
