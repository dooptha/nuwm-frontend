import React, { Component } from 'react';
import { Themes } from './themes.component';
import { themes } from './data';
import { StateContext } from '../../../core/utils/context';
import { storeData } from '../../../core/utils/storage';
import { setLocale } from '../../../core/localization/';

export class ThemesContainer extends Component {
  static contextType = StateContext;

  constructor(props) {
    super(props);

    this.data = themes;
    this.selectedTheme = false;
  }

  selectTheme() {
    console.log('select theme')
    const selectedTheme = this.context[0].properties.theme;

    this.data = this.data.map((el) => {
      el.selected = el.theme == selectedTheme;
      return el;
    });
  }

  updatePropetry(key, value) {
    storeData(key, value);

    this.context[1]({
      type: 'setProperty',
      key: key,
      value: value
    })

    this.selectTheme();
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];
    this.updatePropetry('theme', selectedItem.theme);
  };

  render() {
    if(!this.selectedTheme) {
      this.selectedTheme = true;
      this.selectTheme();
    }


    return(
      <Themes data={this.data} onItemSelect={(i) => this.onItemSelect(i)} />
    )
  }
}
