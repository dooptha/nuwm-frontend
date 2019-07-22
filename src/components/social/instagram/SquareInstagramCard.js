import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
// import LinearGradient from 'react-native-linear-gradient';
import { InstagramIcon } from '../../../assets/icons';
import config from '../../../utils/config';

const SquareInstagramCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    {InstagramIcon(themedStyle.icon)}

    <Text style={themedStyle.title} category="h3">
      #
      {config.INSTAGRAM_HASHTAG}
    </Text>
  </TouchableOpacity>
);

export default withStyles(SquareInstagramCard, () => ({
  box: {
    padding: 20,
    overflow: 'hidden',
  },
  container: {
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D42A76',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
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

// <LinearGradient
//   style={themedStyle.box}
//   start={{ x: 0.2, y: 1 }}
//   end={{ x: 0.4, y: 0 }}
//   colors={['#fdf497', '#fdf497', '#fd5949', '#d6249f', '#285AEB']}
// >
//   <TouchableOpacity
//     style={themedStyle.container}
//     onPress={onPress}
//   >
//     {InstagramIcon(themedStyle.icon)}
//
//     <Text style={themedStyle.title} category="h1">Інстаграм #воднік</Text>
//   </TouchableOpacity>
// </LinearGradient>
