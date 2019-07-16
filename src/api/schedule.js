import axios from 'axios';
import moment from 'moment';

class ScheduleApi {
  constructor() {
    this.api = 'http://localhost:3000/timetable';
  }

  getScheduleOnWeek() {
    const group = 'ПМ-41';
    const now = moment('09.05.2018') || moment(new Date());
    const startDate = now.format('DD.MM.YYYY');
    const endDate = now.add(7, 'days').format('DD.MM.YYYY');

    console.log(startDate, endDate);

    return axios.get(this.api, { params: { group, startDate, endDate } })
      .then((res) => { console.log(res); return res.data.schedule; })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  getSchedule(data) {
    const {
      group, name, startDate, endDate, practicsOnly,
    } = data;

    return axios.get(this.api, {
      params: {
        group, name, startDate, endDate, practicsOnly,
      },
    })
      .then((res) => res.data.schedule)
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}

export default new ScheduleApi();
