import moment from 'moment';
import { api } from '.';
import I18n from '../utils/i18n';

const errorParser = (err) => {
  if (err.message === 'Network Error') return I18n.t('timetable.error-no-server');

  if (err.response) {
    if (err.response.status === 404) return I18n.t('timetable.no-lesson');
    if (err.response.status === 400) return I18n.t('timetable.error-try-later');
  }

  return I18n.t('timetable.error-try-later');
};

export const getScheduleOnWeek = () => {
  const group = 'ПМ-41';
  const now = moment('09.05.2018') || moment(new Date());
  const startDate = now.format('DD.MM.YYYY');
  const endDate = now.add(7, 'days').format('DD.MM.YYYY');

  return api.get('/timetable/test', { params: { group, startDate, endDate } })
    .then((res) => res.data.schedule)
    .catch((err) => ({ error: errorParser(err) }));
};

export const getSchedule = (data) => api.get('/timetable', { params: data })
  .then((res) => res.data.schedule)
  .catch((err) => ({ error: errorParser(err) }));

module.exports = {
  getScheduleOnWeek,
  getSchedule,
};
