import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
     selectedIndex: 0,
    };
  }

  onTabSelect(selectedIndex){
    console.log("TabClick")
    this.setState({ selectedIndex });
  }

  render() {
    return (
     <BottomNavigation
        selectedIndex={this.state.selectedIndex}
        onSelect={() => this.onTabSelect()}>
        <BottomNavigationTab title='Tab 1'/>
        <BottomNavigationTab title='Tab 2'/>
        <BottomNavigationTab title='Tab 3'/>
     </BottomNavigation>
    );
  }
}

export default NavBar;
