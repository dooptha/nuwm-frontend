import React, { Component } from 'react';
import Menu from './menu.component';
import { StateContext } from '../../utils/context';

class MenuContainer extends Component {
  constructor(props) {
    super(props);

    this.navigationKey = 'MenuContainer';
  }

  onTabSelect(index) {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    navigation.navigate({
      key: this.navigationKey,
      routeName: selectedRoute.routeName,
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <StateContext.Consumer>
        {
          () => (
            <Menu
              selectedIndex={navigation.state.index}
              onTabSelect={(index) => this.onTabSelect(index)}
            />
          )
        }
      </StateContext.Consumer>
    );
  }
}

export default MenuContainer;
