import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Text, withStyles,
} from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';

class DetailedLesson extends Component {
  localize(t) { return I18n.t(`timetable.lesson.${t}`); }

  drawRow(data) {
    const { themedStyle } = this.props;
    const { title, info } = data;

    if (info) {
      return (
        <View key={info} style={themedStyle.list}>
          <Text
            style={themedStyle.title}
            appearance="hint"
            category="s2"
          >
            { title }
          </Text>
          <Text style={themedStyle.info}>
            { info }
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { navigation, themedStyle } = this.props;
    const lesson = navigation.state.params.subject;
    const {
      classroom,
      lecturer,
      subgroup,
      streams_type,
      /* lessonNum, */
      time,
      type,
      name,
    } = lesson;

    const quarry = {
      name, classroom, lecturer, subgroup, streams_type, time, type,
    };

    return (
      <View style={themedStyle.detailsWrapper}>
        {
          Object.keys(quarry).map((key) => this.drawRow({ title: this.localize(key), info: quarry[key] }))
        }
      </View>
    );
  }
}

export default withStyles(DetailedLesson, (theme) => ({
  detailsWrapper: {
    paddingTop: 25,
    height: '100%',
    backgroundColor: theme['background-basic-color-2'],
  },
  list: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    borderBottomColor: theme['background-basic-color-1'],
    borderBottomWidth: 1,
  },
  title: {
    width: '30%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
  },
  info: {
    width: '70%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
  },
}));
