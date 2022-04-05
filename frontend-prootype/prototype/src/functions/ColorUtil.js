let colorEdge = '#387172'
let colorContent = '#00f8fc'
let userColor = ['#fc000c', '#0206ff', '#00fc10', '#ffff00', '#fc02b9', '#00e3fc', '#ff9400', '#9b0404', '#7277ff', '#FFFFFF', '#005b0d', '#774504', '#00FF88', '#555555', '#CCCCCC']
let colorTimeSlot = '#FFFFFF'
let colorCalendarRange = '#000000'
let colorCalenderPoll = '#0000FF'
let colorTimeSlotParticipate = '#ff3dfb'
/**
 * helping function that returns true if the separation of foreground and background is good enough and false if it isn´t
 * @param color
 * @returns {boolean}
 */
function luminanz (color) {
  var rgb = []
  rgb[0] = hexToRGB(color).r
  rgb[1] = hexToRGB(color).g
  rgb[2] = hexToRGB(color).b
  rgb[0] /= 255
  rgb[1] /= 255
  rgb[2] /= 255
  // TODO here should be the rgb color of the background of the table that is selectable
  let colorTable = []
  /* colorTable.push(hexToRGB(colorTimeSlot).r)
  colorTable.push(hexToRGB(colorTimeSlot).g)
  colorTable.push(hexToRGB(colorTimeSlot).b) */
  colorTable.push(1)
  colorTable.push(1)
  colorTable.push(0)

  let y1 = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  let y2 = 0.2126 * colorTable[0] + 0.7152 * colorTable[1] + 0.0722 * colorTable[2]
  if (y1 <= (1 / (4.5 * y2))) {
    return true
  }
  return false
}
/**
 * helping function that make hex color to a rgb color
 * @param hex
 * @returns {*}
 */
function hexToRGB (hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}
function getColorArray () {
  var colorArray = []
  let counter = 0
  let pos = 0
  // in this loop the function check if the seperation of the color and background color of the table is good enough
  // if not the color of the colorarray will not be selected and the next color of the colors array will be tried.
  // the function resumes until the userColors array has 10 colors in it
  while (counter < 10) {
    if (luminanz(userColor[pos])) {
      colorArray.push(userColor[pos])
      pos++
      counter++
      if (pos >= userColor.length) pos = 0
    } else {
      pos++
      if (pos >= userColor.length) pos = 0
    }
  }
  return colorArray
}
export {colorContent, colorEdge, userColor, getColorArray, colorCalendarRange, colorTimeSlot, colorCalenderPoll, colorTimeSlotParticipate}
