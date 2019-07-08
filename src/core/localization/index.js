import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import ua from "./ua";
import ru from "./ru";
import en from "./en";
const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}
I18n.fallbacks =
true;
I18n.translations = {
  ua,
  ru,
  en,
};

export const setLocale = (locale) => { 
  I18n.locale = locale
}

export default I18n;
