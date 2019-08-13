import {
  isToday, isTomorrow, replaceDatesWithMomentObjects, getCurrentTime,
} from '../../src/components/timetable/helper';

describe('Timetable helper, ', () => {
  it('replaceDatesWithMomentObjects should return array', () => {
    expect(Array.isArray(replaceDatesWithMomentObjects({}))).toBe(true);
    expect(Array.isArray(replaceDatesWithMomentObjects(undefined))).toBe(true);
    expect(Array.isArray(replaceDatesWithMomentObjects([]))).toBe(true);
  });

  it('isToday should return true on today date', () => {
    expect(isToday(getCurrentTime())).toBe(true);
  });

  it('isToday should return false on other than today date or wrong data', () => {
    const tomorrow = getCurrentTime().add(1, 'day');
    expect(isToday(tomorrow)).toBe(false);
    expect(isToday({})).toBe(false);
  });

  it('isTomorrow should return true on tomorrow date', () => {
    const tomorrow = getCurrentTime().add(1, 'day');
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  it('isTomorrow should return false on other than tomorrow date or wrong data', () => {
    expect(isTomorrow(getCurrentTime())).toBe(false);
    expect(isTomorrow({})).toBe(false);
  });
});
