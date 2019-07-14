import React, { Component } from 'react';
import Themes from './themes.component';
import data from './data';
import { StateContext } from '../../../utils/context';
import { storeKey } from '../../../utils/storage';

class ThemesContainer extends Component {
  constructor(props) {
    super(props);

    this.data = data;
    this.selectedTheme = false;
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];
    this.updatePropetry('theme', selectedItem.theme);
  }

  selectTheme() {
    const selectedTheme = this.context[0].properties.theme;

    this.data = this.data.map((el) => {
      el.selected = el.theme === selectedTheme;
      return el;
    });
  }

  updatePropetry(key, value) {
    storeKey(key, value);

    this.context[1]({
      type: 'setProperty',
      key,
      value,
    });

    this.selectTheme();
  }

  render() {
    if (!this.selectedTheme) {
      this.selectedTheme = true;
      this.selectTheme();
    }
    return (
      <Themes data={this.data} onItemSelect={(i) => this.onItemSelect(i)} />
    );
  }
}

ThemesContainer.contextType = StateContext;
export default ThemesContainer;
