import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Menu } from './menu.component';
import { StateContext } from '../../core/utils/context';

export class MenuContainer extends Component {
  constructor(props) {
    super(props)

    this.navigationKey = 'MenuContainer';
  }

  onTabSelect(index) {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: selectedRoute.routeName,
    });
  };

  render() {
    return (
      <StateContext.Consumer>
        {
          (context) => (
            <Menu
              selectedIndex={this.props.navigation.state.index}
              onTabSelect={(index) => this.onTabSelect(index)}
            />
          )
        }
      </StateContext.Consumer>
    );
  }
}
