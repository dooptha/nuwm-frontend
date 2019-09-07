import * as RNLocalize from 'react-native-localize';
import storage from './storage';

export const getDefaultLocale = () => {
  const preferredLocales = RNLocalize.getLocales();
  let defaultLocale = 'en';

  preferredLocales.some((locale) => {
    switch (locale.languageCode) {
      case 'uk':
        defaultLocale = 'ua';
        return true;
      case 'ru':
        defaultLocale = 'ru';
        return true;
      case 'en':
        defaultLocale = 'en';
        return true;
      default:
        return false;
    }
  });

  return defaultLocale;
};

export const DEFAULT_PROPERTIES = {
  language: getDefaultLocale(),
  theme: 'Eva Light',
  group: 'ПМ-41',
  IOSWidgetTutorialComplete: false,
  autocompleteGroups: {
    values: [],
    lastUpdated: 0,
  },
  autocompleteTeachers: {
    values: [],
    lastUpdated: 0,
  },
};

export const getProperties = async (useDefaults) => {
  const propsPromises = [];

  Object.keys(DEFAULT_PROPERTIES)
    .forEach((key) => {
      propsPromises.push(
        storage.getObject(key)
          .then((value) => [key, (!useDefaults && value) || DEFAULT_PROPERTIES[key]]),
      );
    });

  const loadedPropertiesArray = await Promise.all(propsPromises);
  const properties = {};

  loadedPropertiesArray.forEach((property) => {
    const [key, value] = property;
    properties[key] = value;
  });

  // Override properties from storage like that
  // properties.IOSWidgetTutorialComplete = false;

  // Flag to check if properties are loaded from storage
  properties.loaded = true;

  return properties;
};
