import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  Radio,
  Text,
} from 'react-native-ui-kitten';

const Option = ({
  style,
  voted,
  option,
  themedStyle,
  onVote,
  index,
  isVoting,
}) => {
  const styles = style || {};
  const value = option.value || 0;
  return (
    <View style={themedStyle.container}>
      <View style={themedStyle.radioContainer}>
        {
          voted
            ? (
              <Text style={styles.text}>
                {value}
                %
              </Text>
            ) : (
              <Radio
                style={themedStyle.radio}
                onChange={() => onVote(index)}
              />
            )
        }
      </View>

      <View style={themedStyle.textContainer}>
        <Text
          category="s1"
          style={styles.text}
        >
          {option.name}
        </Text>
        <View style={themedStyle.progressBarContainer}>
          {
            voted
              ? (
                <View style={themedStyle.progressBarBox}>
                  <View style={[
                    themedStyle.progressBar,
                    styles.progressBar,
                    { flex: value }]}
                  />
                  <View style={[{ flex: (100 - value) }]} />
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
}));
