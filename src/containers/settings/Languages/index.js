import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  ListItem,
  withStyles,
} from 'react-native-ui-kitten';
import data from './data';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';
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
    this.updateLanguage(selectedItem.locale);
  }

  updateLanguage(value) {
    setLocale(value);
    storeKey('language', value);

    const [, dispatch] = this.context;

    dispatch({
      type: 'setProperty',
      key: 'language',
      value,
    });
  }

  renderListItem(info) {
    return (
      <ListItem
        title={I18n.t(info.item.title)}
        onPress={this.onItemSelect}
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
