import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withStyles, Text } from 'react-native-ui-kitten';

class FormItem extends Component {
  static defaultProps = {
    row: false,
  }

  renderLabel() {
    const { label, themedStyle } = this.props;

    if (label) {
      return (
        <Text category="s2" style={themedStyle.label}>
          { label }
        </Text>
      );
    }

    return null;
  }

  render() {
    const { themedStyle, children, row } = this.props;
    const wrapperStyle = row ? themedStyle.row : themedStyle.column;
    const childStyle = row ? themedStyle.rowChild : themedStyle.columnChild;

    return (
      <View style={{ ...themedStyle.wrapper, ...wrapperStyle }}>
        { this.renderLabel() }
        <View style={childStyle}>
          { children }
        </View>
      </View>
    );
  }
}

export default withStyles(FormItem, (theme) => ({
  wrapper: {
    marginBottom: 14,
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
  label: {
    paddingLeft: '5%',
    paddingBottom: 5,
    color: theme['text-hint-color'],
  },
  columnChild: {
    width: '90%',
    marginLeft: '5%',
  },
  rowChild: {
    marginRight: '5%',
  },
}));

FormItem.propTypes = {
  row: PropTypes.bool,
};
