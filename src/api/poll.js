import { api } from '.';

function getLastPoll(dispatch) {
  dispatch({ type: 'loadCurrentPoll' });

  return api.get('/polls/active')
    .then((response) => {
      const { poll } = response.data;

      dispatch({ type: 'loadCurrentPollSuccess', poll });
    })
    .catch((e) => {
      dispatch({ type: 'loadCurrentPollFailure' });
      throw e;
    });
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
    .catch((e) => {
      dispatch({ type: 'createPollFailure' });
      throw e;
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
    .catch((e) => {
      dispatch({ type: 'loadPollssFailure' });
      throw e;
    });
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
    .catch((e) => {
      dispatch({
        type: 'voteFailure',
      });

      throw e;
    });
}

export default {
  getLastPoll,
  createPoll,
  getPolls,
  vote,
};
