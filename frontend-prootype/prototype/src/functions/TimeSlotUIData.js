function TimeSlotUI (timeSlotDiv, dayIndex) {
  this.top = timeSlotDiv.offsetTop
  this.bottom = timeSlotDiv.offsetTop + timeSlotDiv.offsetHeight
  this.dayIndex = dayIndex
}

export {TimeSlotUI}
