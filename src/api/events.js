import { api } from '.';
import { splitLastLine } from '../utils/string';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getEvents(dispatch) {
  dispatch({ type: 'loadEvents' });
  // const events = [
  //   {
  //     title: 'Брейк данс батл в 5му гуртожитку, усім приходити в масках',
  //     url: 'https://t.me/ukrainiatrash/6490',
  //     id: Math.random(),
  //     signature: 'by @andriy_pelykh',
  //   },
  //   {
  //     image: 'https://st.depositphotos.com/1825047/1554/i/600/depositphotos_15548297-stock-photo-the-dancer.jpg',
  //     title: 'Брейк данс батл в 5му гуртожитку, усім приходити в масках',
  //     url: 'https://t.me/nuwee_feed/40',
  //     id: Math.random(),
  //   },
  //   {
  //     image: '\n' +
  //       '          signature,',
  //     title: 'Брейк данс батл в 5му гуртожитку, усім приходити в масках',
  //     url: 'https://t.me/ukrainiatrash/6490',
  //     id: Math.random(),
  //   },
  // ];
  //
  // return dispatch({ type: 'loadEventsSuccess', events });

  return api.get('/events')
    .then((response) => (
      response.data.events.map((event) => {
        const [title, signature] = splitLastLine(event.text);

        return ({
          id: event._id,
          image: event.pictureUrl,
          url: event.sharingUrl,
          title,
          signature: signature.replace('Надіслано: ', ''),
          createdAt: new Date(event.createdAt),
        });
      })
    ))
    .then((events) => {
      dispatch({ type: 'loadEventsSuccess', events });
    })
    .catch(() => dispatch({ type: 'loadEventsFailure' }));
}

export default {
  getEvents,
};
