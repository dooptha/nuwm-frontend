import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StateContext } from '../../utils/context';
import data from '../../containers/settings/Themes/data';

const style = {
  position: 'absolute',
  zIndex: 10000,
  backgroundColor: 'red',
  marginTop: 50,
  width: 25,
  height: 25,
  marginLeft: 25,
  alignItems: 'center',
};

export default class extends Component {
  static contextType = StateContext;

  onPress() {
    const currentThemeName = this.context[0].app.properties.theme;
    let index = 0;
    let nextIndex = 0;

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].title === currentThemeName) {
        index = i;
      }
    }

    if (index === data.length - 1) nextIndex = 0;
    else nextIndex = index + 1;

    const [, dispatch] = this.context;

    dispatch({
      type: 'setProperty',
      key: 'theme',
      value: data[nextIndex].theme,
    });
  }

  render() {
    return (
      <TouchableOpacity style={style} onPress={() => this.onPress()}>
        <Text>S</Text>
      </TouchableOpacity>
    );
  }
}
