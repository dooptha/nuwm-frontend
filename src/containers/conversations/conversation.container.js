import React, { Component } from 'react';
import { Conversation } from './conversation.component';
import { storeData } from '../../core/utils/storage';
import { setLocale } from '../../core/localization/';

export class ConversationContainer extends Component {

  constructor(props) {
    super(props);

    this.data = [{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00',
      date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: 'true',
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: 'true',
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },{
      body: 'Sono chino sadame',
      sender: false,
date: '13: 00'
    },];

    this.state = { newMessage: '' }
  }

  onNewMessageChange(newMessage) {
    this.setState({ newMessage });
  };

  updatePropetry(key, value) {
    storeData(key, value);

    this.context[1]({
      type: 'setProperty',
      key: key,
      value: value
    })
  }

  onItemSelect(index) {
    //click on message
  };

  render() {
    return(
      <Conversation
        data={this.data}
        onItemSelect={(i) => this.onItemSelect(i)}
        onNewMessageChange={(m) => this.onNewMessageChange(m)}
        newMessage={this.state.newMessage}
        />
    )
  }
};
