import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: this.transformDate(new Date())
    }
  }

  setTwoFixedNumbers (int) {
    return ('0' + int).slice(-2)
  }

  transformDate (date) {
    let day = this.setTwoFixedNumbers(date.getDate())
    let month = this.setTwoFixedNumbers(date.getMonth())
    let year = date.getFullYear()

    return day + '.' + month + '.' + year
  }

  setDate (date) {
    this.setState({ date: date.replace(/-/g, '.') })
  }

  render () {
    return (
      <DatePicker
        date={this.state.date}
        mode='date'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        format='DD-MM-YYYY'
        onDateChange={(date) => this.setDate(date)}
      />
    )
  }
}
