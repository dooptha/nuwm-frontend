import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Input } from 'react-native-ui-kitten';

class FormInput extends Component {
  state = {
    value: '',
    status: 'primary',
    initialValue: '',
  }

  static defaultProps = {
    placeholder: '',
    style: {},
  }

  onChange(value) {
    const { status } = this.state;
    this.setState({ value });

    if (status === 'danger') this.setState({ status: 'primary' });
  }

  setStatus(status) {
    this.setState({ status });
  }

  render() {
    const {
      props: {
        themedStyle, placeholder, style, defaultValue,
      },
      state: { value, status, initialValue },
    } = this;

    if (defaultValue !== initialValue) {
      this.setState({ value: defaultValue, initialValue: defaultValue });
    }

    const inputStatus = status === 'primary' ? null : status;

    return (
      <Input
        value={value}
        status={inputStatus}
        style={[themedStyle.input, style]}
        placeholder={placeholder || null}
        onChangeText={(v) => this.onChange(v)}
      />
    );
  }
}

export default withStyles(FormInput, () => ({
  input: {
    borderRadius: 2,
  },
}));

FormInput.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};
