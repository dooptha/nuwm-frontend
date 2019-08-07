import moment from 'moment';
import { api } from '.';

export const getScheduleOnWeek = () => {
  const group = 'ПМ-41';
  const now = moment('09.05.2018') || moment(new Date());
  const startDate = now.format('DD.MM.YYYY');
  const endDate = now.add(7, 'days').format('DD.MM.YYYY');

  return api.get('/timetable', { params: { group, startDate, endDate } })
    .then((res) => res.data.schedule)
    .catch((e) => {
      console.log(e.response.data);
      return [];
    });
};

export const getSchedule = (data) => {
  const {
    group, name, startDate, endDate, practicsOnly,
  } = data;

  return api.get('/timetable', {
    params: {
      group, name, startDate, endDate, practicsOnly,
    },
  })
    .then((res) => res.data.schedule)
    .catch((e) => {
      console.log(e.response.data);
      return [];
    });
};

module.exports = {
  getScheduleOnWeek,
  getSchedule,
};
