import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import { InstagramIcon } from '../../../assets/icons';

const InstagramCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    {InstagramIcon(themedStyle.icon)}
    <Text style={themedStyle.title} category="h1">Інстаграм #воднік</Text>
  </TouchableOpacity>
);

export default withStyles(InstagramCard, () => ({
  container: {
    paddingVertical: 40,
    paddingRight: 40,
    paddingLeft: 25,
    backgroundColor: '#D42A76',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: 'white',
    marginRight: 10,
  },
}));
