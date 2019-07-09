class ScheduleApi{

  constructor(){

    this.api = 'http://calc.nuwm.edu.ua:3002/api/sched?';
    this.variablesToApi = {
      lecturer: 'name',
      group: 'group',
      startDate: 'sdate',
      endDate: 'edate',
    };
  }

  generateLink(data){
    let link = this.api;

    for(let property in this.variablesToApi){

      if(data[property]){
        link += this.variablesToApi[property] + '=' + data[property] + '&'
      }
    }

    console.log(link);

    return link;
  }

  getSchedule(data){

    let link = this.generateLink(data);

    return fetch(link)
      .then(data => console.log(data), err => console.log(err))
  }
}

module.exports = new ScheduleApi();
