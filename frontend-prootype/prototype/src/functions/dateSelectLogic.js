import {colorCalendarRange} from './ColorUtil'

let tempStart
let tempEnd
let i
function SingleDates (dateRange, singleDates) {
  this.dateRange = dateRange
  this.newDates = singleDates
  /**
     * this function all dates of the calendar picker if the param date range is the same or is in one of the date ranges of the calendar picker array
     * @param arr
     * @param start
     * @param end
     */
  this.merging = function (arr, start, end) {
    tempStart = start
    tempEnd = end
    for (i = 0; i < arr.length; i++) {
      // delete data range, if it is already marked
      if (start.getTime() === arr[i].start.getTime() && end.getTime() === arr[i].end.getTime()) {
        arr.splice(i, 1)
        return
      }
      // case the start of the new date is before an existing one and the end is between an existing one
      if (start.getTime() < arr[i].start.getTime() && end.getTime() <= arr[i].end.getTime() && end.getTime() >= arr[i].start.getTime()) {
        setParameters(arr, start, arr[i].end)
        continue
      }
      // case the start of the new Date is between an existing one and the end is after the existing one
      if (start.getTime() >= arr[i].start.getTime() && end.getTime() > arr[i].end.getTime() && start.getTime() <= arr[i].end.getTime()) {
        setParameters(arr, arr[i].start, end)
        continue
      }
      // case the start and the end date is between an existing one
      if (start.getTime() >= arr[i].start.getTime() && end.getTime() <= arr[i].end.getTime() && start.getTime() <= arr[i].end.getTime() && end.getTime() >= arr[i].start.getTime()) {
        setParameters(arr, arr[i].start, arr[i].end)
        continue
      }
      // case the start date is before an existing one and the end is after an existing one
      if (start.getTime() < arr[i].start.getTime() && end.getTime() > arr[i].end.getTime()) {
        setParameters(arr, start, end)
      }
    }
    setArray(arr, colorCalendarRange, tempStart, tempEnd)
  }
  /**
     * this function convert the date ranges of the calendar picker to single dates and return them
     * @param dateRange
     * @param newDates
     * @returns {Array}
     */
  this.singleDates = function (dateRange, newDates) {
    newDates = []
    for (let i = 0; i < dateRange.length; i++) {
      let begin = dateRange[i].start.getTime()
      let end = dateRange[i].end.getTime()
      for (let loopTime = begin; loopTime < end; loopTime += 86400000) {
        let date = new Date(loopTime)
        newDates.push(date.toLocaleDateString())
      }
    }
    newDates.sort(this.compareLocaleDates)
    return newDates
  }
  /**
     * this function is the comparator for the single dates. It will be used to sort the single dates in ascending order.
     * @param a
     * @param b
     * @returns {number}
     */
  this.compareLocaleDates = function (a, b) {
    let ayear = parseInt(a.toLocaleString().split('/')[2])
    let amonth = parseInt(a.toLocaleString().split('/')[0])
    let aday = parseInt(a.toLocaleString().split('/')[1])
    let byear = parseInt(b.toLocaleString().split('/')[2])
    let bmonth = parseInt(b.toLocaleString().split('/')[0])
    let bday = parseInt(b.toLocaleString().split('/')[1])
    if (ayear < byear) return -1
    if (ayear > byear) return 1
    if (amonth < bmonth) return -1
    if (amonth > bmonth) return 1
    if (aday < bday) return -1
    if (aday > bday) return 1
    return 0
  }
}
function setParameters (arr, setStart, setEnd) {
  tempStart = setStart
  tempEnd = setEnd
  arr.splice(i, 1)
  i = -1
}
function setArray (arr, color, tempStart, tempEnd) {
  arr.push({
    color: color,
    start: tempStart,
    end: tempEnd
  })
}
export {SingleDates}
