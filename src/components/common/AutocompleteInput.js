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
import { ArrowheadUpIcon, PlusIcon } from '../../assets/icons';
import { DropdownSpring, androidUseLayoutAnimations } from '../../utils/animations';

export class AutocompleteInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      data: [],
    };

    androidUseLayoutAnimations();
    this.onClearInputButtonPress = this.onClearInputButtonPress.bind(this);
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

  onClearInputButtonPress() {
    this.onItemSelect('');
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

  renderClearInputButton() {
    const {
      value,
      themedStyle,
      clearInput,
    } = this.props;

    return clearInput && value.length > 0 ? (
      <View style={themedStyle.clearInputContainer}>
        <TouchableOpacity
          onPress={this.onClearInputButtonPress}
        >
          { PlusIcon(themedStyle.clearInputIcon) }
        </TouchableOpacity>
      </View>
    ) : null;
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
      <>
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
          { this.renderClearInputButton() }
        </View>
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
      </>
    );
  }
}

AutocompleteInputComponent.defaultProps = {
  getDatalist: () => [],
  minLengthToAutocomplete: 1,
  getItemString: (item) => item,
  clearInput: true,
  value: '',
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
  clearInputContainer: {
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    height: '100%',
    paddingTop: 17.5,
  },
  clearInputIcon: {
    transform: [{ rotate: '45deg' }],
    width: 20,
    height: 20,
    tintColor: theme['text-hint-color'],
  },
}));
