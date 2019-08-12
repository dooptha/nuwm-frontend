import moment from 'moment';

const initialDateFormat = 'DD.MM.YYYY';
const initialTimeFormat = 'DD.MM.YYYY HH:mm';

const getCurrentTime = () => moment('2018-09-05 01:00:00');

export const isToday = (date) => {
  if (moment.isMoment(moment)) {
    return date.isSame(getCurrentTime(), 'day');
  }
  // TODO: add error here
  return false;
};

export const isTomorrow = (date) => {
  if (moment.isMoment(moment)) {
    return date.isSame(getCurrentTime().add(1, 'day'), 'day');
  }
  // TODO: add error here
  return false;
};

export const replaceDatesWithMomentObjects = (_data) => {
  const data = Object.assign({}, _data);

  return data.forEach((day) => {
    const dateString = day.date;

    data.day.date = moment.isMoment(day.date)
      ? moment(day.date) : moment(dateString, initialDateFormat);

    day.subjects.forEach((subject) => {
      data.subject.momentTime = moment.isMoment(subject.momentTime)
        ? moment(subject.momentTime)
        : moment(
          `${dateString} ${subject.time.split('-')[0]}`,
          initialTimeFormat,
        );
    });
  });
};
