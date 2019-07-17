import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  Radio,
  Text,
} from 'react-native-ui-kitten';

const Option = ({
  voted,
  option,
  themedStyle,
  onVote,
  index,
}) => {
  return (
    <View style={themedStyle.container}>
      <View style={themedStyle.radioContainer}>
        {
          voted ?
            <Text>{option.value}</Text>
            : (
              <Radio
                style={themedStyle.radio}
                onChange={() => onVote(index)}
              />
            )
        }
      </View>

      <Text
        category="s1"
        style={themedStyle.textStyle}
      >
        {option.name}
      </Text>
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
    width: 24,
    height: 24,
    marginRight: 10,
  },
  radio: {
    color: theme['color-warning-400'],
  },
  textStyle: {
    color: 'white'
  },
}));
