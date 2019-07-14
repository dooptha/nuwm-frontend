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

export const StateContext = createContext();

const reducer = (state, action) => {
  let properties;
  const { messages } = state;

  switch (action.type) {
    case 'setProperty':
      properties = state && state.properties;
      properties[action.key] = action.value;

      return {
        ...state,
        properties,
      };

    case 'loadProperties':
      properties = { ...action.properties };

      return {
        ...state,
        properties,
      };
    case 'updateUser':
      return {
        ...state,
        ...{ currentUser: action.user },
      };
    case 'sendMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
      };

    default:
      return state;
  }
};

export const GlobalState = ({ children }) => {
  // Default global state
  const [state, dispatch] = useReducer(reducer, {
    properties: DEFAULT_PROPERTIES,
    messages: [],
    onlineCount: 1,
    currentUser: {
      image: DefaultUserImage.imageSource,
      name: '',
      email: 'not authorized',
    },
    socket,
  });

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const loadInitialData = async (dispatch) => {
  const currentUser = await getProperties()
    .then(async (properties) => {
      // Set locale and update state
      setLocale(properties.language);
      // eslint-disable-next-line
      await dispatch({ type: 'loadProperties', properties });
    })
    .then(async () => {
      const a = await getObject('user')
        .then(async (user) => {
          if (user) {
            // eslint-disable-next-line
            await dispatch({ type: 'updateUser', user });
          }
          return user;
        });
      return a;
    });

  // eslint-disable-next-line
  initSockets({ dispatch });

  return currentUser;
};

export const useGlobalState = () => useContext(StateContext);
