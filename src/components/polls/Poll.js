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

  const { question, options } = poll;

  return (
    <View style={[themedStyle.container, style && style.container]}>
      <Text
        category="h3"
        style={[themedStyle.question, style && style.question]}
      >
        {question}
      </Text>
      {
        options.map((option, index) => (
          <Option
            style={style && style.option}
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
