import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import {
  getProperties,
  DEFAULT_PROPERTIES,
} from './properties';

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
  const [value, setValue] = useState({
    properties: DEFAULT_PROPERTIES,
  });

  console.log("GlobalState initialize")

  useEffect(() => {
    console.log("useEffect")
    getProperties()
      .then((properties) => setValue(...value, { properties }));
  });

  return (
    <StateContext.Provider value={useReducer(reducer, value)}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
