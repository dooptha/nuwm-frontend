import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  List,
  Text,
} from 'react-native-ui-kitten';
import items from './items';
import { useGlobalState } from '../../../utils/context';
import ListItem from '../../../components/settings/ListItem';
import UserCard from '../../../components/settings/UserCard';

const SettingsContainer = ({ navigation, themedStyle }) => {
  const [context] = useGlobalState();

  const navigateTo = (route) => navigation.navigate({
    key: 'SettingsContainer',
    routeName: route,
  });

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'User':
        return (
          <UserCard
            user={context.currentUser}
            onItemSelect={() => navigateTo(item.route)}
          />
        );
      case 'Empty':
        return (<Text style={themedStyle.empty}>{'\n'}</Text>);
      default:
        return (<ListItem item={item} onItemSelect={() => navigateTo(item.route)} />);
    }
  };

  return (
    <View style={themedStyle.container}>
      <List
        data={items}
        renderItem={renderItem}
      />
    </View>
  );
};

export default withStyles(SettingsContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
  },
}));
