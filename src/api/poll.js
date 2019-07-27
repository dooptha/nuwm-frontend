// import axios from 'axios';
// import config from '../utils/config';

export async function fetchLastPoll() {
  return {
    id: 0,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
        value: 100,
      },
      {
        name: 'Нет',
        value: 10,
      }],
  };
}

export async function fetchPolls() {
  return [{
    id: 0,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет',
      }],
  },
  {
    id: 1,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет',
      }],
  },
  {
    id: 2,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет',
      }],
  },
  {
    id: 3,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет',
      }],
  },
  {
    id: 4,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет',
      }],
  }];
}

function getLastPoll(dispatch) {
  dispatch({ type: 'loadCurrentPoll' });

  fetchLastPoll()
    .then((poll) => {
      setTimeout(() => {
        dispatch({
          type: 'loadCurrentPollSuccess',
          poll,
        });
      }, 1000);
    })
    .catch(() => dispatch({ type: 'loadCurrentPollFailure' }));
}

function getPolls(dispatch) {
  dispatch({ type: 'loadPolls' });

  fetchPolls()
    .then((polls) => {
      setTimeout(() => {
        dispatch({
          type: 'loadPollsSuccess',
          polls,
        });
      }, 1000);
    })
    .catch(() => dispatch({ type: 'loadPollssFailure' }));
}

async function voteRequest(p, i) {
  return {
    id: 0,
    voted: true,
    total: 110,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
        value: 90,
      },
      {
        name: 'Нет',
        value: 10,
      }],
  };
}

function vote(dispatch, p, index) {
  dispatch({
    type: 'vote',
    index,
  });

  voteRequest(p, index)
    .then((poll) => {
      setTimeout(() => {
        dispatch({
          type: 'voteSuccess',
          poll,
        });
      }, 2000);
    })
    .catch(() => {
      dispatch({
        type: 'voteFailure',
      });
    });
}

export default {
  getLastPoll,
  getPolls,
  vote,
};
