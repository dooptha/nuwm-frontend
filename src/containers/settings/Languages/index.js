import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  withStyles,
} from 'react-native-ui-kitten';
import data from './data';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';
import ListItem from '../../../components/settings/ListItem';
import I18n, { setLocale } from '../../../utils/i18n';

class LanguagesContainer extends Component {
  constructor(props) {
    super(props);

    this.data = data;

    this.onItemSelect = this.onItemSelect.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];
    const language = selectedItem.locale;

    setLocale(language);
    storeKey('language', language);

    const [, dispatch] = this.context;

    dispatch({
      type: 'setProperty',
      key: 'language',
      value: language,
    });
  }

  renderListItem(info) {
    const [context] = this.context;
    const selected = context.properties.language === info.item.locale;

    return (
      <ListItem
        index={info.index}
        title={I18n.t(info.item.title)}
        onPress={(i) => this.onItemSelect(i)}
        selected={selected}
      />
    );
  }

  render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.container}>
        <List
          data={this.data}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
}

LanguagesContainer.contextType = StateContext;

export default withStyles(LanguagesContainer, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}));
