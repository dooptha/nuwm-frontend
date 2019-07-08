import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  Text
} from 'react-native-ui-kitten';

class MessageComponent extends Component {
  render() {
    const {  message, themedStyle } = this.props;
    const alignmentStyle = {justifyContent: message.sender? 'flex-end':'flex-start'};

    return(
      <View style={[themedStyle.messageContainer, alignmentStyle]}>
        <Text
          key={0}
          appearance='hint'
          category='c1'>{message.date}
        </Text>
        <View style={themedStyle.cloudContainer} key={1}>
          <View style={[themedStyle.cloud, themedStyle.cloudRight]}>
            <Text>{message.body}</Text>
          </View>
          <View style={[themedStyle.triangle, themedStyle.triangleRight]}/>
        </View>
      </View>
    );
  }
}

export const Message = withStyles(MessageComponent, (theme) => ({
  triangle: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  triangleRight: {
    transform: [{ rotate: '90deg' }],
    borderBottomColor: theme['background-basic-color-1'],
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    maxWidth: Dimensions.get('window').width - 120,
  },
  cloudRight: {
    left: 3,
    backgroundColor: theme['background-basic-color-1'],
    marginLeft: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  }
}));
