import { api, setAuthHeaders } from '.';
import { initSockets } from './socket';
import { storeObject, storeKey } from '../utils/storage';

function logIn(dispatch, navigation, data) {
  dispatch({ type: 'logIn' });

  const { username, deviceId, group } = data;

  api.post('/login', { username, deviceId })
    .then((response) => {
      const { user } = response.data;

      // Should store user after successful validation on server
      dispatch({
        type: 'logInSuccess',
        user,
      });
      storeObject('user', user);

      // Should save group on first login if presented
      if (group) {
        dispatch({
          type: 'setProperty',
          key: 'group',
          value: group,
        });
        storeKey('group', group);
      }

      const { token } = user;

      if (token) {
        setAuthHeaders(token);
        initSockets({ dispatch, token });
      }

      // Should navigate to app after successful validation on server if needed
      if (navigation) {
        navigation.navigate('App');
      }
    })
    .catch((error) => {
      dispatch({ type: 'logInFailure', error });
    });
}

function updateCurrentUser(dispatch, navigation, { username }) {
  dispatch({ type: 'updateCurrentUser' });

  api.post('/users', { username })
    .then((response) => {
      const { user } = response.data;

      dispatch({
        type: 'updateCurrentUserSuccess',
        user,
      });
      storeObject('user', user);

      navigation.goBack();
    })
    .catch((error) => {
      dispatch({ type: 'updateCurrentUserFailure', error });
    });
}

function deleteMessage(message) {
  api.post('/delete_message', { message })
    .then(() => {})
    .catch(() => {});
}

export default {
  logIn,
  deleteMessage,
  updateCurrentUser,
};
