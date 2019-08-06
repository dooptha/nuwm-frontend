import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import { Alert } from 'react-native';
import I18n from './i18n';
import config from '../../config';

const jsGlobalHandler = (e, isFatal) => {
  Alert.alert(
    I18n.t('errors.title'),
    `Error ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

    ${I18n.t('errors.description')}`,
    [{
      text: I18n.t('errors.ok'),
    }],
  );

  // Send error to devs
};

// eslint-disable-next-line
const nativeGlobalHandler = (exceptionString) => {
  // Send error to devs
};

const setupExceptionHandlers = () => {
  setJSExceptionHandler(jsGlobalHandler, config.USE_CUSTOM_JS_EXCEPTION_HANDLER_IN_DEV);

  // eslint-disable-next-line
  if (!__DEV__) {
    // setNativeExceptionHandler works only in bundle mode
    setNativeExceptionHandler(
      nativeGlobalHandler,
      config.NATIVE_EXCEPTION_HANDLER_FORCE_APP_QUIT,
      config.NATIVE_EXCEPTION_HANDLER_EXECUTE_DEFAULT,
    );
  }
};

export default setupExceptionHandlers;
