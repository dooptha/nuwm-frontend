import { api, setAuthHeaders } from '.';
import { initSockets } from './socket';
import { storeObject, storeKey } from '../utils/storage';

function signUp(dispatch, navigation, data) {
  dispatch({ type: 'signUp' });

  api.post('/login', { name: data.name, deviceId: data.deviceId })
    .then((response) => {
      const { token } = response.data;
      const user = {
        name: data.name,
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
        value: data.group,
      });

      storeKey('group', data.group);

      // Set auth headers for future requests
      setAuthHeaders(token, data.deviceId);

      const socket = initSockets({ dispatch, token });
      dispatch({
        type: 'updateSocket',
        socket,
      });

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
