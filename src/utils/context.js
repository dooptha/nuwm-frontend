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
  // Should find workaround async loading of properties
  const init = (state) => {
    getProperties()
      .then((properties) => {
        // Set locale and update state
        setLocale(properties.language);
        // eslint-disable-next-line
        dispatch({ type: 'loadProperties', properties });
      });

    // eslint-disable-next-line
    initSockets({ dispatch });

    return state;
  };

  // Default global state
  const [state, dispatch] = useReducer(reducer, {
    properties: DEFAULT_PROPERTIES,
    messages: [],
    onlineCount: 1,
    socket,
  }, init);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
