import moment from 'moment';
import { api } from '.';
import I18n from '../utils/i18n';

const errorParser = (err) => {
  if (err.message === 'Network Error') return I18n.t('timetable.error-no-server');

  if (err.response) {
    switch (err.response.status) {
      case 404: return I18n.t('timetable.no-lesson');
      case 400: return I18n.t('timetable.error-try-later');
      default: return I18n.t('timetable.error-try-later');
    }
  }

  return I18n.t('timetable.error-try-later');
};

const dateToApiFormat = (date) => (date.format('DD.MM.YYYY'));

export const getScheduleOnWeek = (group) => {
  const now = moment();
  const startDate = dateToApiFormat(now);
  const endDate = dateToApiFormat(now.add(7, 'days'));

  return api.get('/timetable', { params: { group, startDate, endDate } })
    .then((response) => {
      if (response.data.schedule) return response.data.schedule;
      return { error: I18n.t('timetable.error-try-later') };
    })
    .catch((err) => ({ error: errorParser(err) }));
};

export const getSchedule = (data) => api.get('/timetable', {
  params: data,
})
  .then((response) => {
    if (response.data.schedule) return response.data.schedule;
    return response.data.schedule;
  })
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
