import React, { Component } from 'react'
import { Language } from './language.component'
import { languages } from './data'
import { StateContext } from '../../../core/utils/context'
import { storeData } from '../../../core/utils/storage'
import { setLocale } from '../../../core/localization/'

export class LanguageContainer extends Component {
  constructor (props) {
    super(props)

    this.data = languages
  }

  updatePropetry (key, value) {
    setLocale(value)
    storeData(key, value)

    this.context[1]({
      type: 'setProperty',
      key: key,
      value: value
    })
  }

  onItemSelect (index) {
    const selectedItem = this.data[index]
    this.updatePropetry('language', selectedItem.locale)
  };

  render () {
    return (
      <Language data={this.data} onItemSelect={(i) => this.onItemSelect(i)} />
    )
  }
}

LanguageContainer.contextType = StateContext
