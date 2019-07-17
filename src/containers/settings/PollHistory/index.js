import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  withStyles,
} from 'react-native-ui-kitten';
import { StateContext } from '../../../utils/context';
// import I18n from '../../../utils/i18n';
import Poll from '../../../components/polls/Poll';
import { getPolls } from '../../../api/poll';

class PollHistory extends Component {
  componentDidMount() {
    const [, dispatch] = this.context;
    getPolls(dispatch);
  }

  renderListItem(info) {
    const { themedStyle } = this.props;
    return (
      <Poll
      style={themedStyle.poll}
        voted
        poll={info.item}
      />
    );
  }

  render() {
    const { themedStyle } = this.props;
    const [context] = this.context;
    const { poll } = context;

    return (
      <View style={themedStyle.container}>
        <List
          data={poll.items}
          renderItem={(i) => this.renderListItem(i)}
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
    marginVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
}));
