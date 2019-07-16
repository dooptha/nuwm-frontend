import React, { Component } from 'react';
import { withStyles, Input } from 'react-native-ui-kitten';

class FormInput extends Component {
  state = {
    value: '',
    status: 'primary',
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
    const { themedStyle, placeholder, style = {} } = this.props;
    const { value, status } = this.state;

    return (
      <Input
        value={value}
        status={status}
        style={[themedStyle.input, style]}
        placeholder={placeholder || null}
        onChangeText={(v) => this.onChange(v)}
      />
    );
  }
}

export default withStyles(FormInput, (theme) => ({
  input: {
    borderRadius: 2,
  },
}));
