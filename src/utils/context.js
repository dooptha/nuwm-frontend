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
  const [properties, user] = await Promise.all([getProperties(), getObject('user')]);

  setLocale(properties.language);
  dispatch({ type: 'loadProperties', properties });

  if (user) {
    dispatch({ type: 'updateUser', user });
  }

  initSockets({ dispatch });

  return user;
};

export const useGlobalState = () => useContext(StateContext);
