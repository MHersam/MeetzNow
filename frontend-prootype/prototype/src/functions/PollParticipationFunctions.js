/**
 * this function check the password it is correct, if not a text will be showed that it is not correct
 */
function checkPassword () {
  // TODO let the backend do the checking
  if (this.pollPassword === this.password) this.passwordKorrekt = true
  this.firstTry = true
}

/**
 * this function check if a cookie is set. When it is set the timeslots of the users will be shown and the name as well
 */
function checkCookie () {
  if (this.$cookies.isKey('umfrage_' + this.id + '_user_' + this.user.id)) {
    // TODO get the backend data
    var jsonObject = JSON.parse(localStorage.getItem('jsonUser'))
    this.name = jsonObject.userName
    try {
      this.$refs.dateTable.setUserTimeSlot(jsonObject.timeslots)
    } catch (e) {
      console.log(e)
    }
  }
}

/**
 * this function will save all data that is put in the form, time slots, name and will set a cookie
 */
function saveInformation () {
  this.$refs.dateTable.saveTimeSlots()
  for (var i = 0; i < this.userResult.length; i++) {
    console.log('day: ' + i)
    for (var j = 0; j < this.userResult[i].length; j++) {
      console.log(this.userResult[i][j].start)
      console.log(this.userResult[i][j].end)
    }
  }
  // TODO add more necessary data?
  var jsonData = {timeslots: this.userResult,
    dates: this.singleDates,
    startTime: this.selectedStart,
    endTime: this.selectedEnd,
    timeSteps: this.selectedSteps,
    userName: this.name}
  // with the previosly object, we will convert it to an json string
  var data = JSON.stringify(jsonData)
  // TODO send the json string to the backend, probably convert it back to an json object and then send it
  localStorage.setItem('jsonUser', data)
  // var jsonObject = JSON.parse(localStorage.getItem('jsonUser'))
  // the cookie key is umfrage + umfrageID + user + userID
  this.$cookies.set('umfrage_' + this.id + '_user_' + this.user.id, 'GH1.1.1689020474.1484362313', Infinity)
  this.$router.push('/UmfrageListe/')
  this.$router.replace('/UmfrageListe/')
}

/**
 * method will fill some example data
 */
function fillPollParticipationData () {
  // here in the json variable should be the data that is received from the backend, now it is example data
  var json = JSON.parse(localStorage.getItem('jsonData'))
  for (var i = 0; i < json.timeslots.length; i++) {
    this.participateDates[i] = []
    for (var j = 0; j < json.timeslots[i].length; j++) {
      this.participateDates[i].push(json.timeslots[i][j])
    }
  }
  this.singleDates = []
  for (i = 0; i < json.dates.length; i++) {
    this.singleDates.push(new Date(json.dates[i]))
  }
  this.selectedStart = json.startTime
  this.selectedEnd = json.endTime
  this.selectedSteps = json.timeSteps
  if (!(json.password === '')) {
    this.passwordKorrekt = false
  }
  this.pollPassword = json.password
}

export {checkPassword, checkCookie, saveInformation, fillPollParticipationData}
