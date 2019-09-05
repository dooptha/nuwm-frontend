import * as RNLocalize from 'react-native-localize';
import { getDefaultLocale } from '../../src/utils/properties';

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
