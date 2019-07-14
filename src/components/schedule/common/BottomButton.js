import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Button } from 'react-native-ui-kitten';

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { themedStyle } = this.props;

    return (
      <Button style={themedeStyle.button} />
    );
  }
}

export default withStyles(Name, (theme) => ({
  button: {
    width: '100%',
  },
}));
