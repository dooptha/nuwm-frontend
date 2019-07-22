import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import * as ua from '../../i18n/ua';
import * as ru from '../../i18n/ru';
import * as en from '../../i18n/en';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.defaultLocale = 'en';

// Use default locale for fallbacks
I18n.fallbacks = false;

I18n.translations = {
  ua,
  ru,
  en,
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export default I18n;
