import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import routes from './data';
import { useGlobalState } from '../../../utils/context';
// import I18n from '../../../utils/i18n';
import { FloodCard } from '../../../components/conversations';
import Poll from '../../../components/polls/Poll';
import TwitterCard from '../../../components/social/twitter/TwitterCard';

const ConversationsContainer = ({ navigation, themedStyle }) => {
  const [{ onlineCount, poll }] = useGlobalState();

  const navigateTo = (routeKey) => {
    const { routeName, params } = routes[routeKey];

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
      <View style={[themedStyle.pollContainer, themedStyle.box]}>
        <Poll
          style={themedStyle.poll}
          voted={false}
          poll={poll.current}
          onVote={(i) => onVote(i)}
        />
      </View>
      <View style={themedStyle.floodShadowBox}>
        <View style={themedStyle.box}>
          <FloodCard
            onlineCount={onlineCount}
            navigateToChat={() => navigateTo('chat')}
          />
        </View>
      </View>
      <View style={themedStyle.twitterContainer}>
        <TwitterCard onPress={() => navigateTo('twitter')} />
      </View>
    </ScrollView>
  );
};


export default withStyles(ConversationsContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,

  },
  box: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  pollContainer: {
  },
  poll: {
    backgroundColor: theme['color-warning-400'],
  },
  floodShadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.20,
    shadowRadius: 11.14,

    elevation: 17,
  },
  twitterContainer: {
    marginBottom: 200,
  },
}));
