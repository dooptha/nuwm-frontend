import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {
  Input,
  List,
  ListItem,
  withStyles,
} from 'react-native-ui-kitten';
import { ArrowheadUpIcon } from '../../assets/icons';
import { DropdownSpring, androidUseLayoutAnimations } from '../../utils/animations';

export class AutocompleteInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      data: [],
    };

    androidUseLayoutAnimations();
  }

  onInputChange(text) {
    const {
      onChangeText,
      getDatalist,
      minLengthToAutocomplete,
    } = this.props;

    if (text.length >= minLengthToAutocomplete) {
      const data = getDatalist(text);

      this.animate();
      this.setState({ menuVisible: data.length !== 0, data });
    } else {
      this.animate();
      this.setState({ menuVisible: false, data: [] });
    }

    onChangeText(text);
  }

  onItemSelect(text) {
    const { onChangeText } = this.props;

    onChangeText(text);
    this.closeMenu();
  }

  animate() {
    LayoutAnimation.configureNext(DropdownSpring);
  }

  closeMenu() {
    this.animate();
    this.setState({ menuVisible: false });
  }

  renderListItem(info) {
    const { getItemString } = this.props;
    const title = getItemString(info.item);

    return (
      <ListItem
        description={title}
        onPress={() => this.onItemSelect(title)}
      />
    );
  }

  render() {
    const {
      style,
      labelStyle,
      textStyle,
      label,
      placeholder,
      name,
      value,
      returnKeyType,
      inputReference,
      themedStyle,
      status,
    } = this.props;

    const { menuVisible, data } = this.state;

    return (
      <View>
        <Input
          style={style}
          labelStyle={labelStyle}
          textStyle={textStyle}
          label={label}
          placeholder={placeholder}
          name={name}
          value={value}
          returnKeyType={returnKeyType}
          status={status}
          onChangeText={(text) => this.onInputChange(text)}
          ref={inputReference}
        />
        {
          menuVisible ? (
            <View style={themedStyle.dropdown}>
              <List
                data={data}
                renderItem={(i) => this.renderListItem(i)}
                scrollEnabled={false}
              />
              <TouchableOpacity
                style={themedStyle.dropdownIconContainer}
                onPress={() => this.closeMenu()}
              >
                { ArrowheadUpIcon(themedStyle.dropdownIcon) }
              </TouchableOpacity>
            </View>
          ) : null
        }
      </View>
    );
  }
}

AutocompleteInputComponent.defaultProps = {
  getDatalist: () => [],
  minLengthToAutocomplete: 1,
  getItemString: (item) => item,
};

export default withStyles(AutocompleteInputComponent, (theme) => ({
  dropdown: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme['background-basic-color-3'],
  },
  dropdownIconContainer: {
    alignItems: 'center',
  },
  dropdownIcon: {
    tintColor: theme['text-hint-color'],
    width: 22,
    height: 22,
  },
}));
