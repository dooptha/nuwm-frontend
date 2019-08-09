import { api, setAuthHeaders } from '.';
import { initSockets } from './socket';
import { storeObject, storeKey } from '../utils/storage';
import { handleRequestError, Rollbar } from '../utils/errors';

function logIn(dispatch, navigation, data) {
  const { username, deviceId, group } = data;

  dispatch({ type: 'logIn' });

  return api.post('/login', { username, deviceId })
    .then((response) => {
      const { user, token } = response.data;

      // Should store user after successful validation on server
      dispatch({
        type: 'logInSuccess',
        user: {
          ...user,
          ...{ token },
        },
      });

      storeObject('user', {
        ...user,
        ...{ token },
      });

      // Should save group on first login if presented
      if (group) {
        dispatch({
          type: 'setProperty',
          key: 'group',
          value: group,
        });

        storeKey('group', group);
      }

      if (token) {
        setAuthHeaders(token);
        initSockets({ dispatch, token });
      }

      // Should navigate to app after successful validation on server if needed
      if (navigation) {
        navigation.navigate('App');
      }

      // Configure Rollback user
      Rollbar.configure({
        payload: {
          person: {
            id: user.id,
            username: user.username,
            email: user.role,
          },
        },
      });
    })
    .catch((error) => {
      dispatch({ type: 'logInFailure', error });
    });
}

function updateCurrentUser(dispatch, navigation, { username }) {
  dispatch({ type: 'updateCurrentUser' });

  return api.post('/users', { username })
    .then((response) => {
      const { user } = response.data;

      if (user) {
        dispatch({
          type: 'updateCurrentUserSuccess',
          user,
        });

        storeObject('user', user);
      }

      navigation.goBack();
    })
    .catch((error) => {
      dispatch({ type: 'updateCurrentUserFailure', error });
      handleRequestError(error);
    });
}

function deleteMessage(message) {
  return api.post('/delete_message', { message });
}

export default {
  logIn,
  deleteMessage,
  updateCurrentUser,
};
