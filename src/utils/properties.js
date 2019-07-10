import { getData } from './storage';

export const DEFAULT_PROPERTIES = {
  language: 'ua',
  theme: 'NUWM Dark',
};

export const getProperties = async () => {
  const propsPromises = [];

  Object.keys(DEFAULT_PROPERTIES).forEach((key) => {
    propsPromises.push(
      getData(key)
        .then((value) => [key, value || DEFAULT_PROPERTIES[key]]),
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
