import React from 'react';
import {
  View,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import { routes } from './data';
import { useGlobalState } from '../../../utils/context';
import I18n from '../../../utils/i18n';
import { FloodCard } from '../../../components/conversations';

const ConversationsContainer = ({ navigation, themedStyle }) => {
  const [context] = useGlobalState();

  const { routeName, params } = routes[0];
  const { onlineCount } = context;

  const navigateToChat = () => {
    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
  };

  return (
    <View style={themedStyle.container}>
      <FloodCard
        onlineCount={onlineCount}
        navigateToChat={navigateToChat}
      />
    </View>
  );
};


export default withStyles(ConversationsContainer, (theme) => ({
  container: {
    paddingTop: 20,
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
  },
}));
