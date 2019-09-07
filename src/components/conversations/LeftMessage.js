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
import { getSenderColor } from '../../utils/colors';

class Message extends Component {
  getCloudStyle() {
    const {
      messagePosition,
      themedStyle,
    } = this.props;

    const style = [themedStyle.cloud];

    switch (messagePosition) {
      case 'first':
        style.push(themedStyle.cloudFirst);
        break;
      case 'middle':
        style.push(themedStyle.cloudMiddle);
        break;
      case 'last':
        style.push(themedStyle.cloudLast);
        break;
      default:
    }

    return style;
  }

  shouldHaveTriangle() {
    const { messagePosition } = this.props;
    return messagePosition !== 'middle' && messagePosition !== 'first';
  }

  calculateSenderColor() {
    const {
      message,
      theme,
    } = this.props;

    return getSenderColor(
      message.sender.username,
      theme['color-basic-100'],
      0.7,
    );
  }

  renderSender() {
    const {
      message,
      themedStyle,
    } = this.props;

    const { role, username } = message.sender;

    const textColor = {
      color: this.calculateSenderColor(),
    };

    return (
      <Text
        style={[themedStyle.sender, textColor]}
        category="c1"
      >
        {username}
        <Text style={themedStyle.admin}>
          {role === 'admin' ? ' admin' : null}
          {role === 'moderator' ? ' moderator' : null}
        </Text>
      </Text>
    );
  }

  renderTriangle() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.triangleContainer}>
        {
          this.shouldHaveTriangle()
            ? <View style={themedStyle.triangle}/>
            : <View style={themedStyle.noTriangle}/>
        }
      </View>
    );
  }

  render() {
    const { message, themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        {/* TouchableWithoutFeedback */}
        <View>
          <View style={themedStyle.messageContainer}>
            {this.renderTriangle()}
            <View style={themedStyle.cloudContainer}>
              <View style={this.getCloudStyle()}>
                <View>
                  {this.renderSender()}
                  <Text style={themedStyle.messageBody}>
                    {message.body}
                  </Text>
                  <View style={themedStyle.infoContainer}>
                    <Text style={themedStyle.date}>
                      {message.date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(Message, (theme) => ({
  container: {
    alignItems: 'flex-start',
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
    transform: [{ rotate: '-90deg' }],
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
    right: 3,
    backgroundColor: theme['background-basic-color-1'],
    marginRight: 16,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  cloudFirst: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 10,
  },
  cloudMiddle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cloudLast: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 20,
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
  sender: {
    textAlign: 'left',
    color: theme['text-hint-color'],
  },
  admin: {
    color: theme['text-hint-color'],
    fontSize: 13,
  },
}));
