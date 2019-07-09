import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const GlobalState = ({ initialState, children }) => {
  const reducer = (state, action) => {
    let properties
    switch (action.type) {
      case 'setProperty':
        properties = state && state.properties
        properties[action.key] = action.value

        return {
          ...state,
          properties
        }

      case 'loadProperties':
        properties = { ...action.properties }

        return {
          ...state,
          properties
        }
      default:
        return state
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </StateProvider>
  )
}

export const useStateValue = () => useContext(StateContext)
