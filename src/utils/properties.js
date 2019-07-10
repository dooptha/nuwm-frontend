import { getData } from './storage'

export const DEFAULT_PROPERTIES = {
  language: 'ua',
  theme: 'NUWM Dark'
}

export const getProperties = async () => {
  let properties = {}

  for (var key in DEFAULT_PROPERTIES) {
    properties[key] = await getData(key).then((value) => value || DEFAULT_PROPERTIES[key])
  }

  return properties
}
