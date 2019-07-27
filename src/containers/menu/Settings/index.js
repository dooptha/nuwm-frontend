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
        return (<Text style={themedStyle.empty}>{'\n'}</Text>);

      case 'Admin':
        return app.isAdmin ? (
          <ListItem
            title={I18n.t(item.title)}
            icon={item.icon}
            onPress={() => navigateTo(item.route)}
          />
        ) : null;

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
    backgroundColor: theme['background-basic-color-3'],
    flex: 1,
  },
  empty: {

  },
}));
