import moment from 'moment';
import abbreviate from '../../utils/abbreviate';

const dateFormat = 'DD.MM.YYYY';
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

export const replaceDatesWithMoment = (data) => {
  const oldData = JSON.parse(JSON.stringify(data));
  const newData = [];

  if (oldData && oldData.length > 0) {
    oldData.forEach((day, dayIndex) => {
      newData.push({});
      const newDay = newData[dayIndex];
      newDay.subjects = [];

      day.subjects.forEach((subject, subjectIndex) => {
        newDay.subjects.push({});
        const newSubject = newDay.subjects[subjectIndex];

        newSubject.momentTime = moment(`${day.date} ${subject.time.split('-')[0]}`, initialTimeFormat);

        let sc = abbreviate(subject.classroom);
        sc = sc.length > 7 ? `${sc.substring(0, 7)}.` : sc;
        newSubject.shortClassroom = sc;

        let shortInfo = abbreviate(subject.type) || '';
        shortInfo += shortInfo.length > 0 && subject.displayGroup ? ' • ' : '';
        shortInfo += subject.displayGroup ? `${subject.displayGroup}` : '';

        newSubject.shortInfo = shortInfo;

        Object.keys(subject).forEach((key) => {
          if (!newSubject[key]) newSubject[key] = subject[key];
        });
      });

      newDay.date = moment(day.date, dateFormat);

      Object.keys(day).forEach((key) => {
        if (!newDay[key]) newDay[key] = day[key];
      });
    });

    return newData;
  }

  return [];
};
