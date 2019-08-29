import AsyncStorage from '@react-native-community/async-storage';
import DefaultPreference from 'react-native-default-preference';
import config from '../../config';

DefaultPreference.setName(config.APP_GROUP);
const extensionsProps = ['group', 'schedule'];

export const storeKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }

  if (extensionsProps.includes(key)) {
    DefaultPreference.set(key, value)
      .then(() => console.log('done'))
      .catch((e) => console.log(e));
  }
};

export const getKey = async (key) => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }

  return value;
};

export const removeKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const storeObject = async (key, object) => {
  const json = JSON.stringify(object);
  return storeKey(key, json);
};

export const getObject = async (key) => (
  getKey(key)
    .then((value) => (JSON.parse(value)))
);
