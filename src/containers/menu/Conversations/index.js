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
import api from '../../../api/poll';
import Carousel from '../../../components/common/Carousel';
import config from '../../../../config/index';
import I18n from '../../../utils/i18n';

const ConversationsContainer = ({ navigation, themedStyle: style }) => {
  const [{
    poll,
    app,
    conversations,
  }, dispatch] = useContext(StateContext);

  const loadData = () => {
    api.getLastPoll(dispatch);
  };

  const onVote = (index) => {
    api.vote(dispatch, index);
  };

  const openTelegramChat = () => {
    Linking.openURL(config.TELEGRAM_URL);
  };

  const navigateTo = (routeKey) => {
    const { routeName, params } = routes[routeKey];

    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
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
          <Carousel/>
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
      backgroundColor: 'none',
      borderRadius: 16,
      marginBottom: 16,
      // marginHorizontal: 8,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 0,
      paddingRight: 8,
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
