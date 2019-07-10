import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import {
  getProperties,
  DEFAULT_PROPERTIES,
} from './properties';
import { setLocale } from '../core/localization';

export const StateContext = createContext();

const reducer = (state, action) => {
  let properties;
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
    default:
      return state;
  }
};

export const GlobalState = ({ children }) => {
  // Default global state
  const [state, dispatch] = useReducer(reducer, {
    properties: DEFAULT_PROPERTIES,
  });

  useEffect(() => {
    // Load properties from storage first time
    if (!state.properties.loaded) {
      getProperties()
        .then((properties) => {
          // Set locale and update state
          setLocale(properties.language);
          dispatch({ type: 'loadProperties', properties });
        });
    }

    return undefined;
  });

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
