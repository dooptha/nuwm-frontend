import * as RNLocalize from 'react-native-localize';
import storage from '../../src/utils/storage';
import {
  getDefaultLocale,
  getProperties,
  DEFAULT_PROPERTIES,
} from '../../src/utils/properties';

describe('getDefaultLocale() ', () => {
  const en = {
    countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false,
  };

  const ua = {
    countryCode: 'UA', languageTag: 'uk-UA', languageCode: 'uk', isRTL: false,
  };

  const ru = {
    countryCode: 'US', languageTag: 'ru-US', languageCode: 'ru', isRTL: false,
  };

  const notTranslatedLocale = {
    countryCode: 'GWA', languageTag: 'gwa-US', languageCode: 'gwa', isRTL: false,
  };

  it('should return most preferred ua locale', () => {
    RNLocalize.getLocales = jest.fn().mockReturnValue([ua, en, ru]);

    expect(getDefaultLocale()).toBe('ua');
  });

  it('should return most preferred ru locale', () => {
    RNLocalize.getLocales = jest.fn().mockReturnValue([ru, ua, en]);

    expect(getDefaultLocale()).toBe('ru');
  });

  it('should return most preferred en locale', () => {
    RNLocalize.getLocales = jest.fn().mockReturnValue([en, ua, ru]);

    expect(getDefaultLocale()).toBe('en');
  });

  it('should return en as default locale if no translated locale preferred', () => {
    RNLocalize.getLocales = jest.fn().mockReturnValue([notTranslatedLocale]);

    expect(getDefaultLocale()).toBe('en');
  });
});

describe('getProperties()', () => {
  it('should return object with loaded properties', () => {
    storage.getObject = jest.fn().mockResolvedValue('property');

    return getProperties()
      .then((properties) => {
        expect(properties.language)
          .toBe('property');
      });
  });

  it('should return object with default properties if no saved in storage', () => {
    storage.getObject = jest.fn().mockResolvedValue(null);

    return getProperties()
      .then((properties) => {
        expect(properties.language)
          .toBe(DEFAULT_PROPERTIES.language);
      });
  });

  it('should return object with default properties if useDefaults flag is true', () => {
    storage.getObject = jest.fn().mockResolvedValue('property');

    return getProperties(true)
      .then((properties) => {
        expect(properties.language)
          .toBe(DEFAULT_PROPERTIES.language);
      });
  });
});
