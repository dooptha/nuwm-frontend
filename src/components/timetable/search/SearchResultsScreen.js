import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

import Schedule from '../schedule/Schedule';

class SearchResultsScreen extends PureComponent {
  render() {
    const { navigation, themedStyle } = this.props;
    const { state: { params } } = navigation;
    const { schedule, error, startDate } = params;

    return (
      <ScrollView
        style={themedStyle.scrollContainer}
        contentContainerStyle={themedStyle.scroll}
      >
        <Schedule
          refreshing={false}
          data={schedule}
          error={error}
          chosenDate={new Date(0)}
        />
      </ScrollView>
    );
  }
}

export default withStyles(SearchResultsScreen, (theme) => ({
  scroll: {
    flexDirection: 'row',
    minHeight: '100%',
  },
  scrollContainer: {
    backgroundColor: theme['background-basic-color-2'],
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
  },
}));
