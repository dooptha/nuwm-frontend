import moment from 'moment';

const initialDateFormat = 'DD.MM.YYYY';
const initialTimeFormat = 'DD.MM.YYYY HH:mm';

export const getCurrentTime = () => moment();

export const isToday = (date) => {
  if (moment.isMoment(date)) {
    return date.isSame(getCurrentTime(), 'day');
  }
  // TODO: add error here
  return false;
};

export const isTomorrow = (date) => {
  if (moment.isMoment(date)) {
    return date.isSame(getCurrentTime().add(1, 'day'), 'day');
  }
  // TODO: add error here
  return false;
};

export const isOutdated = (date) => getCurrentTime().subtract(7, 'd') > date;

export const replaceDatesWithMoment = (_data) => {
  if (_data && _data.length > 0) {
    const data = JSON.parse(JSON.stringify(_data));

    data.forEach((day) => {
      const dateString = day.date;

      day.date = moment.isMoment(day.date)
        ? moment(day.date) : moment(dateString, initialDateFormat);

      day.subjects.forEach((subject) => {
        subject.momentTime = moment.isMoment(subject.momentTime)
          ? moment(subject.momentTime)
          : moment(
            `${dateString} ${subject.time.split('-')[0]}`,
            initialTimeFormat,
          );
      });
    });

    return data;
  }
  return [];
};
