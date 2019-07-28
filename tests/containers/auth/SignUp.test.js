/* @jest-environment jsdom */

import React from 'react';
import {
  mount,
} from 'enzyme';
import {
} from 'react-native';
import {
  Button,
} from 'react-native-ui-kitten';
import TestApp from '../../utils/TestApp';
import { SignUp } from '../../../src/containers/auth/SignUp';

let button, signUp;

describe('<SignUp> ', () => {
  it('should have enabled button with input data', () => {
    const wrapper = mount(
      <TestApp><SignUp themedStyle={{}} /></TestApp>,
    );

    signUp = wrapper.find(SignUp).last();
    signUp.setState({ name: 'Name', group: 'Group' });

    wrapper.update();

    button = wrapper.find(Button).last();

    expect(button.props().disabled).toBe(undefined);
  });

  it('should have disabled button with no input data', () => {
    const wrapper = mount(
      <TestApp><SignUp themedStyle={{}} /></TestApp>,
    );

    signUp = wrapper.find(SignUp).last();
    button = signUp.find(Button).last();

    expect(button.props().disabled).toBe(true);
  });
});
