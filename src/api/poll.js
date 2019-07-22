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

export function getLastPoll(dispatch) {
  dispatch({ type: 'loadCurrentPoll' });

  fetchLastPoll()
    .then((poll) => {
      setTimeout(() => {
        dispatch({
          type: 'loadCurrentPollSuccess',
          poll,
        });
      }, 2000);
    })
    .catch(() => dispatch({ type: 'loadCurrentPollFailure' }));
}

export function getPolls(dispatch) {
  dispatch({ type: 'loadPolls' });

  fetchPolls()
    .then((polls) => {
      setTimeout(() => {
        dispatch({
          type: 'loadPollsSuccess',
          polls,
        });
      }, 2000);
    })
    .catch(() => dispatch({ type: 'loadPollssFailure' }));
}
