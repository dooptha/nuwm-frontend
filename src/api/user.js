// import axios from 'axios';
// import config from '../utils/config';
import DeviceInfo from 'react-native-device-info';
import { storeObject, storeKey } from '../utils/storage';

export async function signUpUser(user) {
  return {
    accessToken: `token ${user.deviceId} ${user.name}`,
    id: 'id',
    name: user.name,
  };
}

export async function signUp(dispatch, navigation, u) {
  dispatch({ type: 'signUp' });

  signUpUser({ name: u.name, deviceId: DeviceInfo.getUniqueID() })
    .then((user) => {
      setTimeout(() => {
        dispatch({
          type: 'signUpSuccess',
          user,
        });

        // Should store user after successful validation on server
        storeObject('user', user);

        // Should save group aftter succesful sign up

        storeKey('group', u.group);

        dispatch({
          type: 'setProperty',
          key: 'group',
          value: u.group,
        });

        // Should navigate to app after successful validation on server
        navigation.navigate('App');
      }, 2000);
    })
    .catch(() => dispatch({ type: 'signUpFailure' }));
}
