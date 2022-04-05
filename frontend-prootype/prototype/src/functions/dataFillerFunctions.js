import {colorCalenderPoll} from './ColorUtil'

/**
 * this method fill the time array for a begin and end of a poll
 * @returns {Array}
 */
function fillSelectionTime () {
  let hour = 0
  let minutes = 0
  let time = []
  for (let i = 0; i < 2 * 24; i++) {
    if (minutes === 0) time.push(hour + ':' + minutes + '0')
    else time.push(hour + ':' + minutes)
    minutes += 30
    if (i !== 0 && minutes % 60 === 0) hour++
    if (minutes % 60 === 0) minutes = 0
  }
  return time
}

/**
 * this method fill the meeting array, which is used to select the time for a meeting
 */
function fillMeetingArray () {
  let hour = 0
  let minutes = 30
  let meeting = []
  for (let i = 0; i < 2 * 8; i++) {
    if (minutes === 0) meeting.push(hour + ':' + minutes + '0')
    else meeting.push(hour + ':' + minutes)
    minutes += 30
    if (minutes % 60 === 0) hour++
    if (minutes % 60 === 0) minutes = 0
  }
  return meeting
}

/**
 * method fill time Array
 * @param start start time, first element
 * @param end, end time, last element
 * @param steps, steps between each timecell
 */
function setTime (start, end, steps) {
  let time = []
  let startHour = parseInt(start.split(':')[0], 10)
  let startMinutes = parseInt(start.split(':')[1], 10)
  let endHour = parseInt(end.split(':')[0], 10)
  let endMinutes = parseInt(end.split(':')[1], 10)
  if (endHour < startHour) {
    startHour = parseInt(end.split(':')[0], 10)
    endHour = parseInt(start.split(':')[0], 10)
    startMinutes = parseInt(end.split(':')[1], 10)
    endMinutes = parseInt(start.split(':')[1], 10)
  } else if (endMinutes < startMinutes && endHour === startHour) {
    startHour = parseInt(end.split(':')[0], 10)
    endHour = parseInt(start.split(':')[0], 10)
    startMinutes = parseInt(end.split(':')[1], 10)
    endMinutes = parseInt(start.split(':')[1], 10)
  }
  let hourDiff = endHour - startHour
  let step
  let minutesDiff = (endMinutes - startMinutes)
  if (minutesDiff < 0)minutesDiff = minutesDiff + 60
  if (endMinutes < startMinutes)hourDiff = hourDiff - 1
  if (hourDiff > 24)hourDiff = hourDiff - 24
  if (parseInt(steps.split(':')[0], 10) === 1) step = 60
  else step = parseInt(steps.split(':')[1], 10)
  for (var i = 0; i < ((hourDiff * 60 + minutesDiff) / step) + 1; i++) {
    if (startMinutes === 0) time.push(startHour + ':' + startMinutes + '0')
    else time.push(startHour + ':' + startMinutes)
    startMinutes += step
    if (startMinutes % 60 === 0) startHour++
    if (startMinutes % 60 === 0) startMinutes = 0
  }
  return time
}

function fillPollListParticipated () {
  // TODO set it right when the backend is ready
  let pollParticipated = []
  pollParticipated.push({id: 0, thema: 'example one', dateStart: new Date('June 2, 2018'), dateEnd: new Date('June 7, 2018'), place: 'Stuttgart'})
  pollParticipated.push({id: 1, thema: 'example two', dateStart: new Date('June 3, 2018'), dateEnd: new Date('June 8, 2018'), place: 'Stuttgart'})
  return pollParticipated
}

function fillPollListCreated () {
  let pollCreated = []
  pollCreated.push({id: 2, thema: 'example three', dateStart: new Date('June 10, 2018'), dateEnd: new Date('June 11, 2018'), place: 'Stuttgart'})
  pollCreated.push({id: 3, thema: 'example four', dateStart: new Date('June 1, 2018'), dateEnd: new Date('June 2, 2018'), place: 'Stuttgart'})
  return pollCreated
}

function fillCalendarPollListCreated () {
  let pollData = fillPollListCreated()
  let dates = []
  for (let i = 0; i < pollData.length; i++) {
    dates.push({color: colorCalenderPoll, start: pollData[i].dateStart, end: pollData[i].dateEnd})
  }
  return dates
}
function fillCalendarPollListParticipated () {
  let pollData = fillPollListParticipated()
  let dates = []
  for (let i = 0; i < pollData.length; i++) {
    dates.push({color: colorCalenderPoll, start: pollData[i].dateStart, end: pollData[i].dateEnd})
  }
  return dates
}

function fillPollInformation (id) {
  // TODO add the backend stuff
  let info = JSON.parse(localStorage.getItem('pollData'))
  return {theme: info.theme, date: 'noch nicht festgelegt', time: 'noch nicht festgelegt', place: info.place, participateNumbers: 0, creator: 'Du'}
}

export {fillSelectionTime, fillMeetingArray, setTime, fillPollListCreated, fillPollListParticipated, fillCalendarPollListCreated, fillCalendarPollListParticipated, fillPollInformation}
