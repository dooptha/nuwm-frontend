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
        value: 10
      }]
  }
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
        name: 'Нет'
      }]
  },
  {
    id: 1,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет'
      }]
  },
  {
    id: 2,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет'
      }]
  },
  {
    id: 3,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет'
      }]
  },
  {
    id: 4,
    question: 'могут ли расеяне есть камни?',
    options: [
      {
        name: 'Да',
      },
      {
        name: 'Нет'
      }]
  }]
}

export function getLastPoll(dispatch) {
  fetchLastPoll()
    .then((poll) => {
      dispatch({
        type: 'updateCurrentPoll',
        poll,
      });
    })
    .catch((e) => console.error(e));
}

export function getPolls(dispatch) {
  fetchPolls()
    .then((polls) => {
      dispatch({
        type: 'updatePolls',
        polls,
      });
    })
    .catch((e) => console.error(e));
}
