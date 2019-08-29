import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import { setLocaleHeader } from '../api';
import * as ua from '../../i18n/ua';
import * as ru from '../../i18n/ru';
import * as en from '../../i18n/en';

import 'moment/locale/uk';
import 'moment/locale/ru';
import 'moment/locale/en-au';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.defaultLocale = 'en';

// Use default locale for fallbacks
I18n.fallbacks = true;

I18n.translations = {
  ua,
  ru,
  en,
};

const getMomentLocale = () => {
  switch (I18n.locale) {
    case 'ua': return 'uk';
    case 'ru': return 'ru';
    case 'en': return 'en-au';
    default: return 'en-au';
  }
};

export const setLocale = (locale) => {
  I18n.locale = locale;

  setLocaleHeader(locale);
  moment.locale(getMomentLocale());
};

export default I18n;
