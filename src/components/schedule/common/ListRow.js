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

    const rowLabel = label ? (
      <Text category="s2" style={themedStyle.topRow}>
        { label }
      </Text>
    ) : null;

    return (
      <View style={themedStyle.row}>
        { rowLabel }
        <View style={themedStyle.bottomRow}>
          { children }
        </View>
      </View>
    );
  }
}

export default withStyles(ListRow, (theme) => ({
  row: {
    marginTop: 1,
    marginBottom: 1,
    paddingBottom: 4,
    paddingTop: 4,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRow: {
    paddingLeft: '5%',
    paddingBottom: 5,
    width: '100%',
    color: theme['text-hint-color'],
  },
  bottomRow: {
    width: '90%',
    marginLeft: '5%',
  },
}));
