import React, { Component } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import routes from './data';
import { StateContext } from '../../../utils/context';
// import I18n from '../../../utils/i18n';
import { FloodCard } from '../../../components/conversations';
import Poll from '../../../components/polls/Poll';
import {
  SmallInstagramCard,
  SmallTwitterCard,
} from '../../../components/social';
import { getLastPoll, vote } from '../../../api/poll';

class ConversationsContainer extends Component {
  componentDidMount() {
    this.loadData();
  }

  onVote(index) {
    const [{ poll }, dispatch] = this.context;
    vote(dispatch, poll.current, index);
  }

  loadData() {
    const [, dispatch] = this.context;
    getLastPoll(dispatch);
  }

  navigateTo(routeKey) {
    const { routeName, params } = routes[routeKey];
    const { navigation } = this.props;

    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
  }

  render() {
    const { themedStyle } = this.props;
    const [{ poll, onlineCount }] = this.context;

    return (
      <ScrollView
        style={themedStyle.container}
        refreshControl={(
          <RefreshControl
            refreshing={poll.isLoading}
            onRefresh={() => this.loadData()}
          />
        )}
      >
        <View style={themedStyle.box}>
          <Poll
            style={themedStyle.poll}
            voted={poll.current.voted}
            poll={poll.current}
            onVote={(i) => this.onVote(i)}
            votingFor={poll.votingFor}
          />
        </View>
        <View style={themedStyle.floodShadowBox}>
          <View style={themedStyle.box}>
            <FloodCard
              onlineCount={onlineCount}
              navigateToChat={() => this.navigateTo('chat')}
            />
          </View>
        </View>
        <View style={themedStyle.socialContainer}>
          <View style={themedStyle.instagramContainer}>
            <SmallInstagramCard onPress={() => this.navigateTo('instagram')} />
          </View>
          <View style={themedStyle.twitterContainer}>
            <SmallTwitterCard onPress={() => this.navigateTo('twitter')} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

ConversationsContainer.contextType = StateContext;

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
  poll: {
    container: {
      backgroundColor: theme['color-warning-400'],
    },
    question: {
      color: 'white',
    },
    option: {
      text: {
        color: 'white',
      },
      progressBar: {
        backgroundColor: 'white',
      },
    },
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
  socialContainer: {
    flexDirection: 'row',
  },
  instagramContainer: {
    flex: 1,
    marginBottom: 20,
    marginRight: 10,
  },
  twitterContainer: {
    flex: 1,
    marginBottom: 100,
  },
}));
