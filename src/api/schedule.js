import axios from 'axios';
import TimeHelper from '../utils/time';

class ScheduleApi {
  constructor() {
    this.api = 'http://localhost:3000/timetable';
  }

  getScheduleOnWeek() {
    const group = 'ПМ-41';
    const now = '04.09.2018' || new Date();
    const startDate = '04.09.2018' || TimeHelper.toApiDateFormat(now);
    const endDate = '11.09.2018' || TimeHelper.toApiDateFormat(TimeHelper.getDateInAWeek(now));

    return axios.get(this.api, { params: { group, startDate, endDate } })
      .then((res) => res.data.schedule)
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}

export default new ScheduleApi();
