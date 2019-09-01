import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import { CirclesLoader } from 'react-native-indicator';
import { DoneAllOutlineIcon } from '../../assets/icons';

class Message extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const {
      message,
      onMessagePress,
    } = this.props;

    onMessagePress(message);
  }

  getCloudStyle() {
    const {
      messagePosition,
      themedStyle,
    } = this.props;

    switch (messagePosition) {
      case 'first':
        return [
          themedStyle.cloud,
          themedStyle.cloudFirst,
        ];
      case 'middle':
        return [
          themedStyle.cloud,
          themedStyle.cloudMiddle,
        ];
      case 'last':
        return [
          themedStyle.cloud,
          themedStyle.cloudLast,
        ];
      default:
        return themedStyle.cloud;
    }
  }

  shouldHaveTriangle() {
    const { messagePosition } = this.props;
    return messagePosition !== 'middle' && messagePosition !== 'first';
  }

  renderPendingIndicator() {
    const { message, themedStyle } = this.props;

    return (
      <View style={themedStyle.pendingContainer}>
        {
          !message.id
            ? (
              <CirclesLoader
                size={12}
                dotRadius={3}
                color={themedStyle.pendingIndicator.color}
              />
            ) : DoneAllOutlineIcon(themedStyle.pendingCheckmark)
        }
      </View>
    );
  }

  renderTriangle() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.triangleContainer}>
        {
          this.shouldHaveTriangle()
            ? <View style={themedStyle.triangle} />
            : <View style={themedStyle.noTriangle} />
        }
      </View>
    );
  }

  render() {
    const { message, themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={themedStyle.messageContainer}>
            <View style={themedStyle.cloudContainer}>
              <View style={this.getCloudStyle()}>
                <View>
                  <Text style={themedStyle.messageBody}>
                    {message.body}
                  </Text>
                  <View style={themedStyle.infoContainer}>
                    <Text style={themedStyle.date}>
                      {message.date}
                    </Text>
                    {this.renderPendingIndicator()}
                  </View>
                </View>
              </View>
            </View>
            {this.renderTriangle()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default withStyles(Message, (theme) => ({
  container: {
    alignItems: 'flex-end',
    marginVertical: 2,
  },
  triangleContainer: {
    paddingBottom: 15,
  },
  triangle: {
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
    transform: [{ rotate: '90deg' }],
    borderBottomColor: theme['background-basic-color-1'],
  },
  noTriangle: {
    width: 14,
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingBottom: 5,
    maxWidth: Dimensions.get('window').width - 60,
    left: 3,
    backgroundColor: theme['background-basic-color-1'],
    marginLeft: 16,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  cloudFirst: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 10,
  },
  cloudMiddle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cloudLast: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  messageBody: {
    maxWidth: Dimensions.get('window').width - 120,
    minWidth: 70,
    fontFamily: 'Roboto',
    color: theme['text-basic-color'],
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'italic',
    color: theme['text-hint-color'],
    textAlign: 'right',
    flex: 1,
  },

  pendingContainer: {
    marginHorizontal: 3,
  },
  pendingIndicator: {
    color: theme['text-hint-color'],
  },
  pendingCheckmark: {
    width: 16,
    height: 16,
    tintColor: theme['text-hint-color'],
  },
}));
