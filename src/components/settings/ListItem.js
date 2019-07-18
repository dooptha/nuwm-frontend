import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  ListItem,
} from 'react-native-ui-kitten';
import { CheckmarkOutlineIcon } from '../../assets/icons';

const defaultStyle = StyleSheet.create({
  selectedIcon: {
    width: 24,
    height: 24,
  },
});

export default ({
  index,
  title,
  style,
  onPress,
  selected,
  icon,
}) => {
  const renderSelectedIcon = () => CheckmarkOutlineIcon(defaultStyle.selectedIcon);
  const renderIcon = icon ? () => icon : null;

  return (
    <ListItem
      style={style}
      title={title}
      onPress={() => onPress(index)}
      icon={renderIcon}
      accessory={selected ? renderSelectedIcon : null}
    />
  );
};
