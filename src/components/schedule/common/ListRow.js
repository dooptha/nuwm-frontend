import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';

class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLabel() {
    const { label } = this.props;
    const { themedStyle } = this.props;

    if (label) {
      return (
        <Text category="s2" style={themedStyle.topRow}>
          { label }
        </Text>
      );
    }

    return null;
  }

  render() {
    const {
      themedStyle, children, row,
    } = this.props;

    const label = this.renderLabel();
    const wrapperStyle = row ? themedStyle.row : themedStyle.column;
    const childrenStyle = row ? themedStyle.leftSide : themedStyle.bottomRow;

    console.log(row);
    return (
      <View style={{ ...themedStyle.wrapper, ...wrapperStyle }}>
        { label }
        <View style={childrenStyle}>
          { children }
        </View>
      </View>
    );
  }
}

export default withStyles(ListRow, (theme) => ({
  wrapper: {
    marginBottom: 12,
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topRow: {
    paddingLeft: '5%',
    paddingBottom: 5,
    color: theme['text-hint-color'],
  },
  bottomRow: {
    width: '90%',
    marginLeft: '5%',
  },
  leftSide: {
    marginRight: '5%',
  },
}));
