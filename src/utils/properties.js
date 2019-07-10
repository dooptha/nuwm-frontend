import { getData } from './storage';

export const DEFAULT_PROPERTIES = {
  language: 'ua',
  theme: 'NUWM Dark',
};

export const getProperties = async () => {
  const properties = {};

  DEFAULT_PROPERTIES.forEach((key) => {
    properties[key] = getData(key).then((value) => value || DEFAULT_PROPERTIES[key]);
  });

  const loadedProperties = await Promise.all(properties);

  console.log('properties', loadedProperties);
  return loadedProperties;
};
