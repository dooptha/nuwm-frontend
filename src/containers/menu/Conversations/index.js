import React, { useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import routes from './data';
import { StateContext } from '../../../utils/context';
import { SquareFloodCard } from '../../../components/conversations';
import Poll from '../../../components/polls/Poll';
import {
  SquareInstagramCard,
  TelegramCard,
} from '../../../components/social';
import { androidUseLayoutAnimations } from '../../../utils/animations';
import pollApi from '../../../api/poll';
import eventsApi from '../../../api/events';
import Carousel from '../../../components/common/Carousel';
import config from '../../../../config/index';
import I18n from '../../../utils/i18n';
import { buildTelegramPostDeepLink } from '../../../utils/string';

const ConversationsContainer = ({ navigation, themedStyle: style }) => {
  const [{
    poll,
    events,
  }, dispatch] = useContext(StateContext);

  const loadData = () => {
    pollApi.getLastPoll(dispatch);
    eventsApi.getEvents(dispatch);
  };

  const onVote = (index) => {
    pollApi.vote(dispatch, index);
  };

  const navigateTo = (routeKey, options) => {
    const { routeName, params } = routes[routeKey](options);

    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
  };

  const openTelegramChat = () => {
    Linking.openURL(config.TELEGRAM_URL);
  };

  const openEvent = (event) => {
    Linking.openURL(buildTelegramPostDeepLink(event.url));
  };

  useEffect(() => {
    androidUseLayoutAnimations();
    loadData();
  }, []);

  const refresh = (
    <RefreshControl
      refreshing={poll.isLoading}
      onRefresh={loadData}
    />
  );

  return (
    <ScrollView
      style={style.container}
      refreshControl={refresh}
    >
      <View style={style.pollContainer}>
        {poll.current && (
          <Text category="h4">{I18n.t('conversations.poll')}</Text>
        )}
        <Poll
          style={style.poll}
          poll={poll.current}
          onVote={onVote}
          votingFor={poll.votingFor}
          dispatch={dispatch}
        />
      </View>
      {poll.current && <View style={style.divider}/>}
      <View style={style.events.container}>
        <View style={style.events.titles}>
          <Text category="h4">{I18n.t('conversations.events')}</Text>
          <TouchableOpacity
            onPress={() => navigateTo('events')}
          >
            <Text style={style.showAllButton}>
              {I18n.t('conversations.showMore')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.events.content}>
          <Carousel items={events.items} handleClick={openEvent} />
        </View>
      </View>
      <View style={style.divider}/>
      <View style={style.telegram}>
        <TelegramCard
          onPress={openTelegramChat}
          count={100}
        />
      </View>
      {/*<View style={style.divider}/>*/}
      {/*<View style={style.row}>*/}
      {/*  <SquareInstagramCard onPress={() => navigateTo('instagram')}/>*/}
      {/*  <SquareFloodCard*/}
      {/*    onlineCounter={app.onlineCounter}*/}
      {/*    unreadCounter={conversations.unreadCounter}*/}
      {/*    navigateToChat={() => navigateTo('chat')}*/}
      {/*  />*/}
      {/*</View>*/}
      <View style={style.end}/>
    </ScrollView>
  );
};

export default withStyles(ConversationsContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme['background-basic-color-4'],
    marginTop: 16,
    marginHorizontal: 8,
  },
  events: {
    container: {
      marginTop: 8,
    },
    titles: {
      marginLeft: 8,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    content: {
      marginTop: 8,
    },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pollContainer: {
    marginHorizontal: 8,
  },
  poll: {
    container: {
      background: theme['background-basic-color-1'],
      borderRadius: 16,
      marginTop: 8,
      marginBottom: 16,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 32,
      paddingRight: 32,
      shadowColor: '#6c6c6c',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
  },
  telegram: {
    marginHorizontal: 8,
  },
  showAllButton: {
    fontSize: 16,
    color: theme['color-primary-default'],
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  end: {
    height: 64,
  },
}));
