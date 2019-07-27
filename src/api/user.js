import { api, setAuthHeaders } from '.';
import { initSockets } from './socket';
import { storeObject, storeKey } from '../utils/storage';

function signUp(dispatch, navigation, data) {
  dispatch({ type: 'signUp' });
  const { name, deviceId, group } = data;

  api.post('/login', { name, deviceId })
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
      setAuthHeaders(token, deviceId);

      initSockets({ dispatch, token });

      // Should navigate to app after successful validation on server
      navigation.navigate('App');
    })
    .catch(() => dispatch({ type: 'signUpFailure' }));
}

function deleteMessage(message) {
  api.post('/delete_message', { message })
    .then(() => {})
    .catch(() => {});
}

export default {
  signUp,
  deleteMessage,
};
