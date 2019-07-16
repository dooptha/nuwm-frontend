import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  List,
  Text,
} from 'react-native-ui-kitten';
import data from './data';
import { useGlobalState } from '../../../utils/context';
import ListItem from '../../../components/settings/ListItem';
import UserCard from '../../../components/settings/UserCard';
import I18n from '../../../utils/i18n';

const SettingsContainer = ({ navigation, themedStyle }) => {
  const [context] = useGlobalState();

  const navigateTo = (routeName, params) => navigation.navigate({
    key: 'SettingsContainer',
    routeName,
    params,
  });

  const renderItem = ({ item }) => {
    const { currentUser } = context;

    switch (item.type) {
      case 'User':
        return (
          <UserCard
            user={currentUser}
            onItemSelect={() => navigateTo(item.route, { currentUser })}
          />
        );
      case 'Empty':
        return (<Text style={themedStyle.empty}>{'\n'}</Text>);
      default:
        return (
          <ListItem
            title={I18n.t(item.title)}
            onPress={() => navigateTo(item.route)}
          />
        );
    }
  };

  return (
    <View style={themedStyle.container}>
      <List
        data={data}
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
  empty: {

  },
}));
