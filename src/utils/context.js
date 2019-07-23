import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';
import {
  getProperties,
  DEFAULT_PROPERTIES,
} from './properties';
import { setLocale } from './i18n';
import { socket, initSockets } from '../api/socket';
import { DefaultUserImage } from '../assets/images';
import { getObject } from './storage';
import config from '../../config';
import mainReducer from '../reducers';

export const StateContext = createContext();

export const GlobalState = ({ children }) => {
  // Default global state
  const [state, dispatch] = useReducer(mainReducer, {
    app: {
      actions: {
        submitUserForm: () => {},
      },
      properties: DEFAULT_PROPERTIES,
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
    socket,
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
  const [properties, user] = await Promise.all([getProperties(config.USE_DEFAULT_PROPERTIES), getObject('user')]);

  setLocale(properties.language);
  dispatch({ type: 'loadProperties', properties });

  if (user) {
    dispatch({ type: 'updateUser', user });
  }

  initSockets({ dispatch });

  return user;
};

export const useGlobalState = () => useContext(StateContext);
