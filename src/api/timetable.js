import moment from 'moment';
import { api } from '.';
import I18n from '../utils/i18n';
import { storeObject } from '../utils/storage';

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

const parseAutocompleteData = (array) => (
  array.map((item) => ({ title: item }))
);

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

      const autocompleteGroups = {
        values: parseAutocompleteData(groups),
        lastUpdated: Date.now(),
      };

      storeObject('autocompleteGroups', autocompleteGroups);

      dispatch({
        type: 'setProperty',
        key: 'autocompleteGroups',
        value: autocompleteGroups,
      });
    })
    .catch(() => {})
);

const getTeachers = (dispatch) => (
  api.get('/timetable/lecturers')
    .then((response) => {
      const { lecturers } = response.data;

      const autocompleteTeachers = {
        values: parseAutocompleteData(lecturers),
        lastUpdated: Date.now(),
      };

      storeObject('autocompleteTeachers', autocompleteTeachers);

      dispatch({
        type: 'setProperty',
        key: 'autocompleteTeachers',
        value: autocompleteTeachers,
      });
    })
    .catch(() => {})
);

module.exports = {
  getScheduleOnWeek,
  getSchedule,
  getGroups,
  getTeachers,
};
