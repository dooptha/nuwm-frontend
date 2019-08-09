import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {
  Alert,
  Platform,
} from 'react-native';
import {
  Client,
  Configuration,
} from 'rollbar-react-native';
import I18n from './i18n';
import config from '../../config';

export const Rollbar = new Client(new Configuration(config.ROLLBACK_APP_TOKEN, {
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: config.ROLLBACK_ENABLED,
  payload: {
    client: {
      JavaScript: {
        code_version: `${Platform.OS} config.VERSION`,
        environment: 'production',
        source_map_enabled: config.ROLLBACK_USE_SOURCE_MAP,
      },
    },
  },
}));

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
  Rollbar.error(error);
};

const jsGlobalHandler = (error, isFatal) => {
  handleNonRequestError(error, isFatal);
};

// eslint-disable-next-line
const nativeGlobalHandler = (exceptionString) => {
  Rollbar.error(exceptionString);
};

export const setupExceptionHandlers = () => {
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
