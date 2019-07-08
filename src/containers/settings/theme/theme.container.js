import React, { Component } from 'react';
import { Theme } from './theme.component';
import { themes } from './data';
import { StateContext } from '../../../core/utils/context';
import { storeData } from '../../../core/utils/storage';
import { setLocale } from '../../../core/localization/';

export class ThemeContainer extends Component {
  static contextType = StateContext;

  constructor(props) {
    super(props);

    this.data = themes;
  }

  updatePropetry(key, value) {
    storeData(key, value);

    this.context[1]({
      type: 'setProperty',
      key: key,
      value: value
    })
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];
    this.updatePropetry('theme', selectedItem.theme);
  };

  render() {
    return(
      <Theme data={this.data} onItemSelect={(i) => this.onItemSelect(i)} />
    )
  }
}
