import { getKey } from './storage';

export const DEFAULT_PROPERTIES = {
  language: 'ua',
  theme: 'Eva Light',
  group: 'ПМ-41',
};

export const getProperties = async (useDefaults) => {
  const propsPromises = [];

  Object.keys(DEFAULT_PROPERTIES).forEach((key) => {
    propsPromises.push(
      getKey(key)
        .then((value) => [key, (!useDefaults && value) || DEFAULT_PROPERTIES[key]]),
    );
  });

  const loadedPropertiesArray = await Promise.all(propsPromises);
  const properties = {};

  loadedPropertiesArray.forEach((property) => {
    const [key, value] = property;
    properties[key] = value;
  });

  // Flag to check if properties are loaded from storage
  properties.loaded = true;

  return properties;
};
