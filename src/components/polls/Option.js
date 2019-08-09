import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import {
  withStyles,
  Radio,
  Text,
} from 'react-native-ui-kitten';

const Option = ({
  style,
  poll,
  option,
  themedStyle,
  onVote,
  index,
  votingFor,
}) => {
  const styles = style || {};
  const value = option.votes || 0;
  const percentageValue = value / poll.votes * 100;

  const canVote = () => (
    poll.active && !poll.voted
  );

  const renderRadioBox = () => (
    canVote()
      ? (
        <Radio
          style={themedStyle.radio}
          onChange={() => onVote(option.id)}
        />
      ) : (
        <Text style={[styles.text, themedStyle.text]}>
          {value}
        </Text>
      )
  );

  const renderLoader = () => (
    votingFor === index
      ? <ActivityIndicator color="000000" />
      : null
  );

  return (
    <View style={themedStyle.container}>
      <View style={themedStyle.radioContainer}>
        {
          votingFor !== undefined
            ? renderLoader()
            : renderRadioBox()
        }
      </View>

      <View style={themedStyle.textContainer}>
        <Text
          category="s1"
          style={[styles.text, themedStyle.text]}
        >
          {option.value}
        </Text>
        <View style={themedStyle.progressBarContainer}>
          {
            !canVote()
              ? (
                <View style={themedStyle.progressBarBox}>
                  <View style={[
                    themedStyle.progressBar,
                    styles.progressBar,
                    { flex: percentageValue }]}
                  />
                  <View style={[{ flex: (100 - percentageValue) }]} />
                </View>
              ) : null
          }
        </View>
      </View>
    </View>
  );
};

export default withStyles(Option, (theme) => ({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  radioContainer: {
    width: 40,
    height: 24,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  radio: {
    color: theme['color-warning-400'],
  },
  textContainer: {
    flex: 1,
  },
  progressBarContainer: {
    flex: 1,
    height: 5,
  },
  progressBarBox: {
    flex: 1,
    height: 5,
    flexDirection: 'row',
  },
  progressBar: {
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: theme['text-basic-color'],
  },
  text: {
    fontFamily: 'Roboto',
  },
}));
