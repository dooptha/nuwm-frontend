import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import Option from './Option';
import { PlusIcon } from '../../assets/icons';

const Poll = ({
  poll,
  themedStyle,
  onVote,
  style,
  votingFor,
  exitButton,
  dispatch,
}) => {
  if (!poll || !poll.options) {
    return null;
  }

  // Workaround using that component as a list item
  const styles = style[2] || style || {};

  const { question, options } = poll;

  const HidePoll = () => {
    if (dispatch) {
      dispatch({ type: 'hidePoll' });
    }
  };

  const renderExitButton = () => (
    exitButton && poll.voted
      ? (
        <View style={themedStyle.exitIconContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={HidePoll}
          >
            {PlusIcon(themedStyle.exitIcon)}
          </TouchableOpacity>
        </View>
      ) : null
  );

  return (
    <View style={[themedStyle.container, styles.container]}>
      {renderExitButton()}
      <Text
        category="h3"
        style={[themedStyle.question, styles.question]}
      >
        {question}
      </Text>
      {
        options.map((option, index) => (
          <Option
            style={styles.option}
            key={option.id}
            index={index}
            option={option}
            poll={poll}
            onVote={onVote}
            votingFor={votingFor}
          />
        ))
      }
    </View>
  );
};

Poll.defaultProps = {
  poll: false,
  themedStyle: {},
  onVote: () => {},
  style: {},
  votingFor: undefined,
  exitButton: false,
};

export default withStyles(Poll, (theme) => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme['background-basic-color-1'],
  },
  question: {
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  exitIconContainer: {
    alignItems: 'flex-end',
    marginRight: -10,
    marginTop: -10,
    marginBottom: -14,
  },
  exitIcon: {
    transform: [{ rotate: '45deg' }],
    tintColor: '#ffffff',
    width: 24,
    height: 24,
  },
}));
