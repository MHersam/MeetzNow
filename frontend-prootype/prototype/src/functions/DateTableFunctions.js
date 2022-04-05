function DateTableFunctions () {
  this.setTimeCell = function (row, colorTableTime) {
    let cell = row.insertCell(0)
    cell.className = 'tableRow'
    cell.style.backgroundColor = colorTableTime
    // first cell of the first row is always Zeit
    cell.innerHTML = 'Zeit'
    cell.style.width = '50px'
    return cell
  }
  this.setDateCells = function (row, dates, colorTableTime, i) {
    let cell
    cell = row.insertCell(i)
    cell.classList.add('tableData')
    cell.style.backgroundColor = colorTableTime
    cell.innerHTML = dates[i - 1]
    return cell
  }
  this.setTableRowData = function (ref, i) {
    let row = ref.insertRow(i)
    row.classList.add('tableData')
    row.setAttribute('ref', 'tableRowData')
    return row
  }
  this.setTimeCellContent = function (row, time, colorTableTime, i) {
    let cell = row.insertCell(0)
    cell.innerHTML = time[i - 1]
    cell.classList.add('tableData')
    cell.setAttribute('ref', 'tableTimeCell')
    cell.style.backgroundColor = colorTableTime
    cell.style.width = '50px'
  }
  this.setCellsContent = function (row, colorTableCells, mouseDown, mouseUp, mouseOver, pos, j) {
    let cell = row.insertCell(j)
    cell.setAttribute('ref', 'tableContent')
    cell.style.backgroundColor = colorTableCells
    cell.classList.add('tableData')
    cell.setAttribute('draggable', false)
    cell.addEventListener('mousedown', mouseDown, false)
    cell.addEventListener('mousemove', mouseOver, false)
    return cell
  }
  this.documentEventListenerInitialization = function (doc, mouseUp) {
    doc.addEventListener('mouseup', mouseUp, false)
  }
}

function setTimeCell (row, colorTableTime) {
  let cell = row.insertCell(0)
  cell.className = 'tableRow'
  cell.style.backgroundColor = colorTableTime
  // first cell of the first row is always Zeit
  cell.innerHTML = 'Zeit'
  cell.style.width = '50px'
  return cell
}

export {setTimeCell, DateTableFunctions}
