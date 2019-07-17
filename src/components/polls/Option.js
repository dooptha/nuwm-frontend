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
              <Radio onChange={() => onVote(index)} />
            )
        }
      </View>

      <Text>{option.name}</Text>
    </View>
  );
};

export default withStyles(Option, (theme) => ({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme['background-basic-color-1'],
    flexDirection: 'row',
  },
  radioContainer: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
}));
