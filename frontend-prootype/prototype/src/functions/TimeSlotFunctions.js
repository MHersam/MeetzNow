import {colorTimeSlot, colorTimeSlotParticipate} from './ColorUtil'
import {serverBus} from '../main'

function setDocumentListener (document, timeSlotDivs, timeLength, tableContent, time, timeSlotsParticipated, participate) {
  document
    .documentElement
    .addEventListener('DOMAttrModified', function (e) {
      /* for (let i = 0; i < timeSlotDivs.length; i++) {
        timeSlotDivs[i].innerHTML = setTimeTimeSlot(timeSlotDivs[i].offsetTop, timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight, time, tableContent[0].offsetHeight)
        if ((timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight) > (timeLength) * tableContent[0].offsetHeight) {
          timeSlotDivs[i].style.height = timeSlotDivs[i].offsetHeight - ((timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight) - (tableContent[0].offsetHeight + (time.length - 1) * tableContent[0].offsetHeight)) + 'px'
          timeSlotDivs[i].innerHTML = setTimeTimeSlot(timeSlotDivs[i].offsetTop, timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight, time, tableContent[0].offsetHeight)
        }
        if (participate) {
          for (let j = 0; j < timeSlotsParticipated.length; j++) {
            if (timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight > timeSlotsParticipated[j].offsetTop + timeSlotsParticipated[j].offsetHeight && timeSlotDivs[i].offsetTop > timeSlotsParticipated[j].offsetTop && timeSlotDivs[i].offsetLeft === timeSlotsParticipated[j].offsetLeft) {
              timeSlotDivs[i].style.height = timeSlotDivs[i].offsetHeight - ((timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight) - (timeSlotsParticipated[j].offsetTop + timeSlotsParticipated[j].offsetHeight)) + 'px'
            }
          }
        }
      } */
    }, false)
}

function resizeListener (timeSlotDiv, tableContent, time, participate, pos, timeSlotsParticipated) {
  timeSlotDiv.innerHTML = setTimeTimeSlot(timeSlotDiv.offsetTop, timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight, time, tableContent[0].offsetHeight)
  if ((timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight) > (time.length) * tableContent[0].offsetHeight) {
    timeSlotDiv.style.height = timeSlotDiv.offsetHeight - ((timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight) - (tableContent[0].offsetHeight + (time.length - 1) * tableContent[0].offsetHeight)) + 'px'
    timeSlotDiv.innerHTML = setTimeTimeSlot(timeSlotDiv.offsetTop, timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight, time, tableContent[0].offsetHeight)
    serverBus.$emit('sizeDivChanged', pos)
  }
  if (participate) {
    for (let j = 0; j < timeSlotsParticipated.length; j++) {
      if (timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight > timeSlotsParticipated[j].offsetTop + timeSlotsParticipated[j].offsetHeight && timeSlotDiv.offsetTop > timeSlotsParticipated[j].offsetTop && timeSlotDiv.offsetLeft === timeSlotsParticipated[j].offsetLeft) {
        console.log('timeslotsparitcipated')
        timeSlotDiv.style.height = timeSlotDiv.offsetHeight - ((timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight) - (timeSlotsParticipated[j].offsetTop + timeSlotsParticipated[j].offsetHeight)) + 'px'
        serverBus.$emit('sizeDivChanged', pos)
      }
    }
  }
  // serverBus.$emit('sizeDivChanged', pos)
}

function resizeListenerUp (timeSlotDiv, tableContent, time, participate, pos, timeSlotsParticipated) {
  resizeListener(timeSlotDiv, tableContent, time, participate, pos, timeSlotsParticipated)
  serverBus.$emit('sizeDivChanged', pos)
}

function mergeTimeSlots (arr, timeSlotNew, tableContent, tableHeader, drag, time, created, timeSlotsParticipated, mouseMove) {
  let oldDiv
  if (created) {
    oldDiv = arr[arr.length - 1]
    arr.splice(arr.length - 1, 1)
  }
  let removedElement
  let dayIndex = Math.floor(timeSlotNew.offsetLeft / tableContent[0].offsetWidth)
  let tempTop = timeSlotNew.offsetTop
  let tempBottom = timeSlotNew.offsetTop + timeSlotNew.offsetHeight
  // find Duplicates and eliminate them because of dragging and scrolling
  if (arr.includes(timeSlotNew)) {
    let index = arr.findIndex((element) => {
      return element === timeSlotNew
    })
    removedElement = arr[index]
    arr.splice(index, 1)
  }
  for (let i = 0; i < arr.length; i++) {
    let arrayDayIndex = Math.floor(arr[i].offsetLeft / tableContent[0].offsetWidth)
    let newTop = timeSlotNew.offsetTop
    let newBottom = timeSlotNew.offsetTop + timeSlotNew.offsetHeight
    let arrayTop = arr[i].offsetTop
    let arrayBottom = arr[i].offsetTop + arr[i].offsetHeight
    if (arrayDayIndex === dayIndex) {
      // case newTop is over an existing one and newBottom is between one
      if (newTop < arrayTop && newBottom <= arrayBottom && newBottom >= arrayTop) {
        console.log('case1: ' + 'newTop < arrayTop && newBottom <= arrayBottom && newBottom >= arrayTop')
        tempTop = newTop
        tempBottom = arrayBottom
        serverBus.$emit('removeChild', arr[i])
        arr.splice(i, 1)
        i = -1
        continue
      }
      // case newTop is between an existing one and newBottom is after an existing one
      if (newTop >= arrayTop && newBottom > arrayBottom && newTop <= arrayBottom) {
        console.log('case2: ' + 'newTop >= arrayTop && newBottom > arrayBottom && newTop <= arrayBottom')
        tempTop = arrayTop
        tempBottom = newBottom
        serverBus.$emit('removeChild', arr[i])
        arr.splice(i, 1)
        i = -1
        continue
      }
      // case newTop and newBottom are between an existing one
      if (newTop >= arrayTop && newBottom <= arrayBottom && newTop <= arrayBottom && newBottom >= arrayTop) {
        console.log('case3: ' + 'newTop >= arrayTop && newBottom <= arrayBottom && newTop <= arrayBottom && newBottom >= arrayTop')
        tempTop = arrayTop
        tempBottom = arrayBottom
        serverBus.$emit('removeChild', arr[i])
        arr.splice(i, 1)
        i = -1
        continue
      }
      // case newTop and newBottom cover an existing one
      if (newTop < arrayTop && newBottom > arrayBottom) {
        console.log('case4: ' + 'newTop < arrayTop && newBottom > arrayBotto')
        tempTop = newTop
        tempBottom = newBottom
        serverBus.$emit('removeChild', arr[i])
        arr.splice(i, 1)
        i = -1
      }
    }
  }
  let timeSlot = createATimeSlot(tempBottom, tempTop, tableContent[0].offsetWidth, tableContent[dayIndex].offsetLeft, drag, arr.length, time, tableContent, false, timeSlotsParticipated, mouseMove)
  arr.push(timeSlot)
  try {
    serverBus.$emit('removeChild', oldDiv)
    serverBus.$emit('removeChild', removedElement)
    timeSlot.style.pointerEvents = 'auto'
    serverBus.$emit('appendChild', timeSlot)
  } catch (e) {
    console.log(e)
  }
}

function createATimeSlot (tempTop, top, width, left, drag, pos, time, tableContent, participate, timeSlotsParticipated, mouseMove) {
  let timeSlot = document.createElement('div')
  let height = Math.abs(tempTop - top)
  let divTop = 0
  if (top < tempTop) divTop = top
  else divTop = tempTop
  timeSlot.style.top = divTop + 'px'
  timeSlot.style.width = width - 10 + 'px'
  timeSlot.style.position = 'absolute'
  timeSlot.style.left = left + 'px'
  timeSlot.style.height = height + 'px'
  timeSlot.style.backgroundColor = colorTimeSlotParticipate
  timeSlot.style.border = 'thin solid #000000'
  timeSlot.style.overflow = 'auto'
  timeSlot.addEventListener('contextmenu', function (e) {
    e.preventDefault()
  }, false)
  if (!participate) {
    timeSlot.style.backgroundColor = colorTimeSlot
    timeSlot.style.pointerEvents = 'none'
    timeSlot.style.resize = 'vertical'
    timeSlot.draggable = true
    timeSlot.addEventListener('dragstart', drag.bind(this, pos), false)
    timeSlot.addEventListener('mouseup', resizeListenerUp.bind(this, timeSlot, tableContent, time, participate, pos, timeSlotsParticipated), false)// add timeSlotsParticipated probably
    timeSlot.addEventListener('mousemove', resizeListener.bind(this, timeSlot, tableContent, time, mouseMove, pos, timeSlotsParticipated), false)
  }
  timeSlot.innerHTML = setTimeTimeSlot(divTop, divTop + height, time, tableContent[0].offsetHeight)
  return timeSlot
}

function setTimeTimeSlot (top, bottom, time, height) {
  let cellBeforePx
  let cellAfterPx
  let percentage
  let timeString = ''
  let minutes = 0
  let hour = 0
  let fullHour = 0
  let difference = time[1].split(':')[1] - time[0].split(':')[1]
  try {
    if (time[0].split(':')[1] === time[1].split(':')[1])fullHour = 60
  } catch (e) {

  }
  for (let i = 0; i < time.length - 1; i++) {
    cellBeforePx = height + i * height
    cellAfterPx = height + (i + 1) * height
    if (top > cellBeforePx && top <= cellAfterPx) {
      percentage = (top - ((i + 1) * height)) / height
      if (fullHour === 0)minutes = difference * percentage
      else minutes = fullHour * percentage
      if (parseInt(time[i].split(':')[1]) !== 0) minutes += parseInt(time[i].split(':')[1])
      minutes = Math.ceil(minutes)
      if (minutes >= 60)minutes %= 60
      if (minutes < 10) minutes = '0' + minutes
      hour = parseInt(time[i].split(':')[0])
      if ((minutes === 0 || minutes === '00'))hour++
      timeString += hour + ':' + minutes + '-'
    }
    if (bottom > cellBeforePx && bottom <= cellAfterPx) {
      percentage = (bottom - ((i + 1) * height)) / height
      if (fullHour === 0)minutes = difference * percentage
      else minutes = fullHour * percentage
      if (parseInt(time[i].split(':')[1]) !== 0) minutes += parseInt(time[i].split(':')[1])
      minutes = Math.ceil(minutes)
      if (minutes >= 60)minutes %= 60
      if (minutes < 10) minutes = '0' + minutes
      hour = parseInt(time[i].split(':')[0])
      if ((minutes === 0 || minutes === '00'))hour++
      timeString += hour + ':' + minutes
    }
  }
  return timeString
}

function deleteTimeSlot (event, scrollbar, timeSlotDivs, tableTop, tableLeft, pos) {
  serverBus.$emit('removeChild', timeSlotDivs[pos])
  timeSlotDivs.splice(pos, 1)
}
function checkMouseUnderTimeSlot (event, scrollbar, timeSlotDivs, tableTop, tableLeft) {
  let mouseY = event.clientY - tableTop + scrollbar.$el.scrollTop + window.scrollY
  let mouseX = event.clientX - tableLeft + scrollbar.$el.scrollLeft + window.scrollX
  for (let i = 0; i < timeSlotDivs.length; i++) {
    if (mouseX >= timeSlotDivs[i].offsetLeft && mouseX < timeSlotDivs[i].offsetLeft + timeSlotDivs[i].offsetWidth &&
            mouseY >= timeSlotDivs[i].offsetTop && mouseY < timeSlotDivs[i].offsetTop + timeSlotDivs[i].offsetHeight) {
      return {bool: true, pos: i}
    }
  }
  return {bool: false, pos: 0}
}

function saveTimeSlot (timeSlotDivs, tableContent, dates) {
  let result = []
  let date = new Date()
  let dayIndex = 0
  let start = ''
  let end = ''
  let top = 0
  let height = 0
  for (let i = 0; i < timeSlotDivs.length; i++) {
    dayIndex = Math.floor(timeSlotDivs[i].offsetLeft / tableContent[0].offsetWidth)
    date = dates[dayIndex]
    start = timeSlotDivs[i].innerHTML.split('-')[0]
    end = timeSlotDivs[i].innerHTML.split('-')[1]
    top = timeSlotDivs[i].offsetTop
    height = timeSlotDivs[i].offsetHeight
    result.push({start: start, end: end, dayIndex: dayIndex, day: date, top: top, height: height})
  }
  return result
}

function convertTimeToCoordinates (startTime, endTime, time, tableContent, dates) {
  let startMinutes = parseInt(startTime.split(':')[1])
  let endMinutes = parseInt(endTime.split(':')[1])
  let difference = parseInt(time[1].split(':')[1]) - parseInt(time[0].split(':')[1])
  let fullHour = false
  if (difference === 0) fullHour = true
  startTime = getComparableTime(startTime)
  endTime = getComparableTime(endTime)
  let timeBefore, timeAfter, percentage, top, height
  for (let i = 0; i < time.length - 1; i++) {
    timeBefore = getComparableTime(time[i])
    timeAfter = getComparableTime(time[i + 1])
    if (startTime >= timeBefore && startTime < timeAfter) {
      if (fullHour) percentage = startMinutes / 60
      else percentage = (startMinutes - (i % (60 / difference)) * difference) / difference
      top = tableContent[(i) * dates.length].offsetHeight * percentage + tableContent[(i) * dates.length].offsetTop
    }
    if (endTime >= timeBefore && endTime < timeAfter) {
      if (fullHour) percentage = endMinutes / 60
      else percentage = (endMinutes - (i % (60 / difference)) * difference) / difference
      height = tableContent[(i) * dates.length].offsetHeight * percentage + tableContent[(i) * dates.length].offsetTop - top
    }
  }
  return {top: top, height: height}
}
function getComparableTime (timeString) {
  let moment = require('moment')
  let date = new Date()
  date = date.toISOString()
  let newDateString = date.split('T')[0] + 'T' + timeString
  return new Date(moment(newDateString)).getTime()
}

function getIndexArray (arr, el) {
  if (arr.includes(el)) {
    return arr.findIndex((element) => {
      return element === el
    })
  }
}

function handleWindowResize (dates, timeSlotDivs, tableContent, dayIndexDiv, timeSlotsParticipated, timeSlots, paricipate) {
  for (let i = 0; i < timeSlotsParticipated.length; i++) {
    serverBus.$emit('removeChild', timeSlotsParticipated[i])
    timeSlotsParticipated[i].style.width = tableContent[timeSlots[i].dayIndex].offsetWidth - 10 + 'px'
    timeSlotsParticipated[i].style.left = tableContent[timeSlots[i].dayIndex].offsetLeft + 'px'
    if (paricipate) {
      serverBus.$emit('appendChild', timeSlotsParticipated[i])
    }
  }
  for (let i = 0; i < timeSlotDivs.length; i++) {
    serverBus.$emit('removeChild', timeSlotDivs[i])
    timeSlotDivs[i].style.width = tableContent[dayIndexDiv[i]].offsetWidth - 10 + 'px'
    timeSlotDivs[i].style.left = tableContent[dayIndexDiv[i]].offsetLeft + 'px'
    serverBus.$emit('appendChild', timeSlotDivs[i])
    serverBus.$emit('saveDayIndexDiv')
  }
}

function fillDayIndexDiv (dayIndexDiv, timeSlotDivs, tableContent, dates) {
  dayIndexDiv = []
  for (let i = 0; i < timeSlotDivs.length; i++) {
    for (let j = 0; j < dates.length; j++) {
      if (timeSlotDivs[i].offsetLeft === tableContent[j].offsetLeft) {
        dayIndexDiv[i] = j
      }
    }
  }
  return dayIndexDiv
}

function getPositionInTimeSlot (timeSlotsParticipated, timeSlot) {
  for (let i = 0; i < timeSlotsParticipated.length; i++) {
    if (timeSlotsParticipated[i].offsetTop < timeSlot.offsetTop && timeSlotsParticipated[i].offsetTop + timeSlotsParticipated[i].offsetHeight >
        timeSlot.offsetTop + timeSlot.offsetHeight && timeSlotsParticipated[i].offsetLeft === timeSlot.offsetLeft) {
      return i
    }
  }
}
export {setDocumentListener, mergeTimeSlots, createATimeSlot, setTimeTimeSlot, deleteTimeSlot, checkMouseUnderTimeSlot, saveTimeSlot, convertTimeToCoordinates, getIndexArray, getComparableTime, handleWindowResize, fillDayIndexDiv, getPositionInTimeSlot, resizeListener}
