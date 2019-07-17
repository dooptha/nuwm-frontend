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
import config from './config';

export const StateContext = createContext();

const reducer = (state, action) => {
  let changes;
  const { messages } = state;

  switch (action.type) {
    case 'setProperty':
      changes = state && state.properties;
      changes[action.key] = action.value;

      return {
        ...state,
        properties: changes,
      };

    case 'loadProperties':
      changes = { ...action.properties };

      return {
        ...state,
        properties: changes,
      };
    case 'updateUser':
      return {
        ...state,
        ...{ currentUser: action.user },
      };

    case 'updateCurrentPoll':
      return {
        ...state,
        ...{ poll: { current: action.poll } },
      };

    case 'sendMessage':
      messages.push(action.message);

      return {
        ...state,
        messages,
      };

    case 'updatePolls':
      return {
        ...state,
        ...{ poll: { items: action.polls } },
      };

    case 'setAction':
      changes = { ...state.actions };
      changes[action.key] = action.callback;

      return {
        ...state,
        ...{ actions: changes },
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
    actions: {
      submitUserForm: () => {},
    },
    poll: {},
    socket,
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
