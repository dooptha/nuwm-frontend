import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';

class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { themedStyle, children, label } = this.props;

    return (
      <View style={themedStyle.row}>
        <Text style={themedStyle.leftColumn}>
          { label }
        </Text>
        { children }
      </View>
    );
  }
}

export default withStyles(ListRow, (theme) => ({
  row: {
    paddingLeft: 5,
    paddingTop: 12,
    paddingBottom: 12,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftColumn: {
    paddingLeft: 15,
    width: '35%',
  },
}));
