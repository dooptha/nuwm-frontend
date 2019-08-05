import { api, setAuthHeaders } from '.';
import { initSockets } from './socket';
import { storeObject, storeKey } from '../utils/storage';

function authorize(dispatch) {
  api.get('/users/access')
    .then(() => dispatch({ type: 'updateRole', isAdmin: true }))
    .catch(() => dispatch({ type: 'updateRole', isAdmin: false }));
}

function signUp(dispatch, navigation, data) {
  dispatch({ type: 'signUp' });
  const { name, deviceId, group } = data;

  api.post('/login', { username: name, deviceId })
    .then((response) => {
      const { token } = response.data;

      const user = {
        name,
        accessToken: token,
      };

      // Should store user after successful validation on server
      dispatch({
        type: 'signUpSuccess',
        user,
      });

      storeObject('user', user);

      // Should save group aftter succesful sign up
      dispatch({
        type: 'setProperty',
        key: 'group',
        value: group,
      });

      storeKey('group', group);

      // Set auth headers for future requests
      setAuthHeaders(token);

      // Then get role from server
      authorize(dispatch);

      // Then initialize sockets
      initSockets({ dispatch, token });

      // Should navigate to app after successful validation on server
      navigation.navigate('App');
    })
    .catch((error) => {
      dispatch({ type: 'signUpFailure', error });
    });
}

function updateCurrentUser(dispatch, navigation, data) {
  dispatch({ type: 'updateCurrentUser' });
  const { name } = data;

  api.post('/users', { username: name })
    .then((response) => {
      const user = {
        name: response.data.user.username,
      };

      console.log('succesful', user);

      dispatch({
        type: 'updateCurrentUserSuccess',
        user,
      });

      storeObject('user', user);

      navigation.goBack();
    })
    .catch((error) => {
      console.log('failure', error);
      dispatch({ type: 'updateCurrentUserFailure', error });
    });
}

function deleteMessage(message) {
  api.post('/delete_message', { message })
    .then(() => {})
    .catch(() => {});
}

export default {
  signUp,
  deleteMessage,
  authorize,
  updateCurrentUser,
};
