import React, { useContext } from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { Button, ButtonGroup, withStyles } from 'react-native-ui-kitten';
import { StateContext } from '../../utils/context';
import { SafeAreaView, ScrollView } from 'react-navigation';
import EventListItem from '../../components/events/ListItem';
import config from '../../../config';
import { buildTelegramPostDeepLink } from '../../utils/string';

const Events = ({ themedStyle }) => {
  const [{
    events,
  }] = useContext(StateContext);

  const openChannel = () => {
    Linking.openURL(config.TELEGRAM_CHANNEL_URL);
  };

  const openBot = () => {
    Linking.openURL(config.TELEGRAM_BOT_URL);
  };

  const openEvent = (item) => {
    const url = buildTelegramPostDeepLink(item.url);
    Linking.openURL(url);
  };

  const items = events.items.map((item) => (
    <EventListItem
      key={item.id}
      item={item}
      handlePress={() => openEvent(item)}
    />
  ));

  return (
    <SafeAreaView style={themedStyle.container}>
      <View style={themedStyle.buttonsContainer}>
        <Button
          style={themedStyle.button}
          appearance="outline"
          onPress={openChannel}
          size="small"
        >
          До каналу
        </Button>
        <Button
          style={themedStyle.button}
          onPress={openBot}
          size="small"
        >
          Створити
        </Button>
      </View>
      <ScrollView style={themedStyle.items}>
        {items}
      </ScrollView>
    </SafeAreaView>
  );
};

export default withStyles(Events, (theme) => ({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  buttonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme['background-basic-color-3'],
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
  },
  items: {
    flex: 1,
    paddingBottom: 200,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
