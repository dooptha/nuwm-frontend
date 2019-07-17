import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import { routes } from './data';
import { useGlobalState } from '../../../utils/context';
// import I18n from '../../../utils/i18n';
import { FloodCard } from '../../../components/conversations';
import Poll from '../../../components/polls/Poll';

const ConversationsContainer = ({ navigation, themedStyle }) => {
  const [context] = useGlobalState();

  const { routeName, params } = routes[0];
  const { onlineCount, poll } = context;

  const navigateToChat = () => {
    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
  };

  const onVote = (index) => {
    console.log('vote', index);
  };

  return (
    <ScrollView style={themedStyle.container}>
      <View style={themedStyle.pollContainer}>
        <Poll
          voted={false}
          poll={poll.current}
          onVote={(i) => onVote(i)}
        />
      </View>
      <FloodCard
        onlineCount={onlineCount}
        navigateToChat={navigateToChat}
      />
    </ScrollView>
  );
};


export default withStyles(ConversationsContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
  },
  pollContainer: {
    marginBottom: 20,
  },
}));
