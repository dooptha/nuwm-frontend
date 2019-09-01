import { LayoutAnimation } from 'react-native';
import { LinearNewPoll } from '../utils/animations';
import { api } from '.';
import { handleRequestError } from '../utils/errors';

function getLastPoll(dispatch) {
  dispatch({ type: 'loadCurrentPoll' });

  return api.get('/polls/active')
    .then((response) => {
      const { poll } = response.data;

      LayoutAnimation.configureNext(LinearNewPoll);
      dispatch({ type: 'loadCurrentPollSuccess', poll });
    })
    .catch(() => dispatch({ type: 'loadCurrentPollFailure' }));
}

function closeLastPoll(dispatch) {
  return api.post('/polls/active/close')
    .then(() => dispatch({ type: 'closeLastPollSuccess' }))
    .catch((error) => handleRequestError(error));
}

function createPoll(dispatch, data) {
  dispatch({ type: 'createPoll' });

  return api.post('/polls', data)
    .then((response) => {
      const { poll } = response.data;

      dispatch({
        type: 'createPollSuccess',
        poll,
      });
    })
    .catch((error) => {
      dispatch({ type: 'createPollFailure' });
      handleRequestError(error);
    });
}

function getPolls(dispatch) {
  dispatch({ type: 'loadPolls' });

  return api.get('/polls')
    .then((response) => {
      const { polls } = response.data;

      dispatch({
        type: 'loadPollsSuccess',
        polls,
      });
    })
    .catch(() => dispatch({ type: 'loadPollsFailure' }));
}

function vote(dispatch, index) {
  dispatch({ type: 'vote', index });

  return api.post(`/polls/${index}`)
    .then((response) => {
      const { poll } = response.data;

      dispatch({
        type: 'voteSuccess',
        poll,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'voteFailure',
      });

      handleRequestError(error);
    });
}

export default {
  getLastPoll,
  closeLastPoll,
  createPoll,
  getPolls,
  vote,
};
