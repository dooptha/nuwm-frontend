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
  const [{ user, app }] = useGlobalState();

  const navigateTo = (routeName, params) => navigation.navigate({
    key: 'SettingsContainer',
    routeName,
    params,
  });

  const routes = data.filter((route) => (
    (route.type === 'Admin' && app.isAdmin) || route.type !== 'Admin'
  ));

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'User':
        return (
          <UserCard
            user={user.current}
            onItemSelect={() => navigateTo(item.route, { currentUser: user.current })}
          />
        );

      case 'Empty':
        return (<View style={themedStyle.empty}><Text>{'\n'}</Text></View>);

      case 'End':
        return (<View style={themedStyle.end}><Text>{'\n'}</Text></View>);

      default:
        return (
          <ListItem
            title={I18n.t(item.title)}
            icon={item.icon}
            onPress={() => navigateTo(item.route)}
          />
        );
    }
  };

  return (
    <List
      style={themedStyle.container}
      data={routes}
      renderItem={renderItem}
    />
  );
};

export default withStyles(SettingsContainer, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
  },
  empty: {
    borderTopWidth: 1,
    borderTopColor: theme['background-basic-color-3'],
    borderBottomWidth: 1,
    borderBottomColor: theme['background-basic-color-3'],
  },
  end: {
    borderTopWidth: 1,
    borderTopColor: theme['background-basic-color-3'],
  },
}));
