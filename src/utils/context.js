import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  getProperties,
  DEFAULT_PROPERTIES,
} from './properties';
import { setLocale } from './i18n';
import { initSockets } from '../api/socket';
import { DefaultUserImage } from '../assets/images';
import { getObject } from './storage';
import config from '../../config';
import mainReducer from '../reducers';
import { setAuthHeaders } from '../api';

export const StateContext = createContext();

export const GlobalState = ({ children }) => {
  // Default global state
  const [state, dispatch] = useReducer(mainReducer, {
    app: {
      actions: {
        submitUserForm: () => {},
      },
      properties: DEFAULT_PROPERTIES,
      socket: undefined,
    },
    conversations: {
      messages: [],
    },
    user: {
      current: {
        image: DefaultUserImage.imageSource,
        name: '',
        email: 'not authorized',
      },
    },
    poll: {
      current: {},
      items: [],
      isLoading: false,
    },
    // Should move onlineCount to conversations reducer
    onlineCount: 1,
  });

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const loadInitialData = async (dispatch) => {
  const [properties, user, deviceId] = await Promise.all([getProperties(config.USE_DEFAULT_PROPERTIES), getObject('user'), DeviceInfo.getUniqueID()]);

  setLocale(properties.language);
  dispatch({ type: 'loadProperties', properties });

  if (user) {
    dispatch({ type: 'updateUser', user });

    // Set auth headers for api requests
    setAuthHeaders(user.accessToken, deviceId);

    const socket = initSockets({ dispatch, token: user.accessToken });
    dispatch({
      type: 'updateSocket',
      socket,
    });
  }

  dispatch({ type: 'updateDeviceId', deviceId });

  return user;
};

export const useGlobalState = () => useContext(StateContext);
