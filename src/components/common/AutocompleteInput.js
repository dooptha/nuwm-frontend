import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Input,
  List,
  ListItem,
  withStyles,
} from 'react-native-ui-kitten';

export class AutocompleteInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      data: [],
    };
  }

  onInputChange(text) {
    const {
      onChangeText,
      getDatalist,
      minLengthToAutocomplete,
    } = this.props;

    if (text.length >= minLengthToAutocomplete) {
      const data = getDatalist(text);

      this.setState({ menuVisible: true, data });
    }

    onChangeText(text);
  }

  onItemSelect(text) {
    const { onChangeText } = this.props;

    onChangeText(text);
    this.closeMenu();
  }

  closeMenu() {
    this.setState({ menuVisible: false });
  }

  renderListItem(info) {
    const { themedStyle } = this.props;

    return (
      <ListItem
        style={themedStyle.dropdownItem}
        description={info.item}
        onPress={() => this.onItemSelect(info.item)}
      />
    );
  }

  render() {
    const {
      style,
      labelStyle,
      textStyle,
      label,
      name,
      value,
      returnKeyType,
      reference,
    } = this.props;

    const { menuVisible, data } = this.state;

    return (
      <View>
        <Input
          style={style}
          labelStyle={labelStyle}
          textStyle={textStyle}
          label={label}
          name={name}
          value={value}
          returnKeyType={returnKeyType}
          onChangeText={(text) => this.onInputChange(text)}
          ref={reference}
        />
        {
          menuVisible ? (
            <List
              data={data}
              renderItem={(i) => this.renderListItem(i)}
              scrollEnabled={false}
            />
          ) : null
        }
      </View>
    );
  }
}

AutocompleteInput.defaultProps = {
  getDatalist: () => [],
  minLengthToAutocomplete: 1,
};

export default withStyles(AutocompleteInput, (theme) => ({
  dropdownItem: {
  //   borderBottomWidth: 0.5,
  //   borderBottomColor: theme['text-hint-color'],
  },
}));
