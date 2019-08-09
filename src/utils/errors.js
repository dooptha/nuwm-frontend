import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import { Alert } from 'react-native';
import I18n from './i18n';
import config from '../../config';

export const handleRequestError = (error) => {
  Alert.alert(
    I18n.t('errors.responseTitle'),
    `${error.response.data.error}

    ${I18n.t('errors.responseDescription')}`,
    [{
      text: I18n.t('errors.ok'),
    }],
  );
};

const handleNonRequestError = (error, isFatal) => {
  Alert.alert(
    I18n.t('errors.title'),
    `Error ${(isFatal) ? 'Fatal:' : ''} ${error.name} ${error.message}

    ${I18n.t('errors.description')}`,
    [{
      text: I18n.t('errors.ok'),
    }],
  );

  // Send error to devs
};

const jsGlobalHandler = (error, isFatal) => {
  handleNonRequestError(error, isFatal);
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
