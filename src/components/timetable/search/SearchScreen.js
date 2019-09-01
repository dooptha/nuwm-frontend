import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';
import I18n from '../../../utils/i18n';

import Schedule from '../Schedule';

class SearchScreen extends PureComponent {
  render() {
    const { navigation, themedStyle } = this.props;
    const { state: { params } } = navigation;
    const { schedule, error } = params;

    const mes = schedule.length > 0 ? false : error || false;

    return (
      <ScrollView
        style={themedStyle.scrollContainer}
        contentContainerStyle={themedStyle.scroll}
      >
        <Schedule
          schedule={schedule}
          message={mes || I18n.t('timetable.no-lesson')}
          active
        />
      </ScrollView>
    );
  }
}

export default withStyles(SearchScreen, (theme) => ({
  scroll: {
    flexDirection: 'row',
    minHeight: '100%',
  },
  scrollContainer: {
    backgroundColor: theme['background-basic-color-1'],
    borderTopColor: theme['border-basic-color-4'],
    borderTopWidth: 1,
  },
}));
