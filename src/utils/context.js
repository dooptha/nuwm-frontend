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
import { getObject } from './storage';
import config from '../../config';
import mainReducer from '../reducers';
import { setAuthHeaders } from '../api';
import userApi from '../api/user';
import timetableApi from '../api/timetable';

export const StateContext = createContext();

export const GlobalState = ({ children }) => {
  // Default global state
  const [state, dispatch] = useReducer(mainReducer, {
    app: {
      actions: {
        submitUserForm: () => {},
        submitTimetableForm: () => {},
      },
      properties: DEFAULT_PROPERTIES,
      onlineCounter: 1,
      connected: true,
      groups: [],
    },
    conversations: {
      messages: [],
      unreadCounter: 0,
    },
    user: {
      current: {
        username: '',
        role: '',
      },
    },
    poll: {
      current: {},
      items: [],
      isLoading: false,
    },
  });

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const loadInitialData = async (dispatch) => {
  // Do async initial loadings
  const [properties, user, deviceId] = await Promise.all([
    getProperties(config.USE_DEFAULT_PROPERTIES),
    getObject('user'),
    DeviceInfo.getUniqueID(),
  ]);

  setLocale(properties.language);
  dispatch({ type: 'loadProperties', properties });

  if (user) {
    dispatch({ type: 'updateUser', user });

    // Set auth headers for api requests
    setAuthHeaders(user.token);

    const { username } = user;

    // Fetch current user
    userApi.logIn(dispatch, null, {
      username,
      deviceId,
    });

    // Then initialize sockets
    initSockets({ dispatch, token: user.token });
  }

  dispatch({ type: 'updateDeviceId', deviceId });

  // Fetch groupds list for autocomplete
  timetableApi.getGroups(dispatch);

  return user;
};

export const useGlobalState = () => useContext(StateContext);


// Works only with PureComponent
export const connect = (mapStateToProps) => (
  (WrappedComponent) => {
    class Connect extends React.Component {
      static contextType = StateContext;

      render() {
        const [state] = this.context;
        const props = { ...this.props, ...mapStateToProps(state) };
        return <WrappedComponent {...props} />;
      }
    }

    return Connect;
  }
);
