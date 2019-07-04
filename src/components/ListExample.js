import React from 'react';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';

export const ListExample = (props) => {

  const data = [
    'Item 1',
    'Item 2',
    'Item 3',
  ];

  const onItemPress = (index) => {
    // Handle item press
  };

  const renderItem = (info) => {
    return (
      <ListItem
        title={info.item}
        description='Description'
        onPress={onItemPress}
      />
    );
  };

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ListExample;
