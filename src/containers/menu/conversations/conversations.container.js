import React, { Component } from 'react';
import { Conversations } from './conversations.component';
import { routes } from './routes';
import { StateContext } from '../../../core/utils/context';

export class ConversationsContainer extends Component {

  constructor(props) {
    super(props);

    this.data = routes;
    this.navigationKey = 'ConversationsContainer';
  }

  onItemSelect(index) {
    const selectedItem = this.data[index];

    console.log('open chat', selectedItem)
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: selectedItem.route,
      params: selectedItem.params
    });
  };

  render() {
    return (
      <StateContext.Consumer>
        {
          (context) => (
            <Conversations
              data={this.data}
              onItemSelect={(i) => this.onItemSelect(i)}
            />
          )
        }
      </StateContext.Consumer>
    );
  }
}
