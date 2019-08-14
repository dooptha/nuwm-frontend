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

const dateToApiFormat = (date) => (date.format('DD.MM.YYYY'));

export const getScheduleOnWeek = () => {
  const group = 'ПМ-41';
  const now = moment('09.05.2018') || moment(new Date());
  const startDate = dateToApiFormat(now);
  const endDate = dateToApiFormat(now.add(7, 'days'));

  return api.get('/timetable/test', { params: { group, startDate, endDate } })
    .then((response) => response.data.schedule)
    .catch((err) => ({ error: errorParser(err) }));
};

export const getSchedule = (data) => api.get('/timetable', {
  params: data,
})
  .then((response) => response.data.schedule)
  .catch((err) => ({ error: errorParser(err) }));

const getGroups = (dispatch) => (
  api.get('/timetable/groups')
    .then((response) => {
      const { groups } = response.data;

      dispatch({
        type: 'loadGroups',
        groups,
      });
    })
    .catch(() => {})
);


module.exports = {
  getScheduleOnWeek,
  getSchedule,
  getGroups,
};
