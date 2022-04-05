function safeThePoll (startTime, endTime, timeSteps, meetingLength, place, theme, style, dates, colorEdge, colorContent, durationDate, timeSlots) {
  // TODO check if starttime < endtime and if not switch it
  let pollData = {startTime: startTime,
    endTime: endTime,
    timeSteps: timeSteps,
    meetingLength: meetingLength,
    place: place,
    theme: theme,
    style: style,
    dates: dates,
    colorEdge: colorEdge,
    colorContent: colorContent,
    startParticipateDate: durationDate.start,
    endParticipateDate: durationDate.end,
    timeSlots: timeSlots}
  let data = JSON.stringify(pollData)
  localStorage.setItem('pollData', data)
  // console.log(data)
  // let json = JSON.parse(localStorage.getItem('pollData'))
}

export {safeThePoll}
