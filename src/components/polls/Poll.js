import React from 'react';
import {
  View,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import Option from './Option';

const Poll = ({
  voted,
  poll,
  themedStyle,
  onVote,
  style,
}) => {
  if (!poll || !poll.options) {
    return null;
  }

  // Workaround using that component as a list item
  const styles = style[2] || style || {};

  const { question, options } = poll;

  return (
    <View style={[themedStyle.container, styles.container]}>
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
            key={option.name}
            index={index}
            option={option}
            voted={voted}
            onVote={(i) => onVote(i)}
          />
        ))
      }
    </View>
  );
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
  },
}));
