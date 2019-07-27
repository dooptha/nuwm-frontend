import React, { Component } from 'react';
import {
  View,
  RefreshControl,
} from 'react-native';
import {
  List,
  withStyles,
} from 'react-native-ui-kitten';
import { StateContext } from '../../../utils/context';
// import I18n from '../../../utils/i18n';
import Poll from '../../../components/polls/Poll';
import api from '../../../api/poll';

class PollHistory extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const [, dispatch] = this.context;
    api.getPolls(dispatch);
  }

  renderListItem(info) {
    const { themedStyle } = this.props;

    return (
      <Poll
        style={themedStyle.poll}
        poll={info.item}
        voted
      />
    );
  }

  render() {
    const { themedStyle } = this.props;
    const [{ poll }] = this.context;

    return (
      <View style={themedStyle.container}>
        <List
          data={poll.items}
          renderItem={(i) => this.renderListItem(i)}
          refreshControl={(
            <RefreshControl
              refreshing={poll.isLoading}
              onRefresh={() => this.loadData()}
            />
          )}
        />
      </View>
    );
  }
}

PollHistory.contextType = StateContext;

export default withStyles(PollHistory, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
    paddingHorizontal: 15,
  },
  poll: {
    container: {
      marginVertical: 5,
      borderRadius: 20,
      overflow: 'hidden',
    },
  },
}));
