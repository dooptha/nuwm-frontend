import React from 'react';
import {
  ListItem,
} from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';

export default ({ item, style, onItemSelect }) => (
  <ListItem
    style={style}
    title={I18n.t(item.title)}
    onPress={() => onItemSelect()}
  />
);
