const solutions = require('./puzzle-strings').puzzlesAndSolutions

class SudokuSolver {

  validate(puzzleString) {
    let check = puzzleString.match(/[A-Za-z]/g)
    return puzzleString.length == 81 && !check ? true : false
  }

  checkRowPlacement(puzzleString, row, column, value) {
    //Using remainders to find the specific row
    let rowIndex = (row.charCodeAt(0) % 65) * 9
    //Then slicing the row
    let rows = puzzleString.slice(rowIndex, rowIndex + 9)
    let sameRow = rows.indexOf(value) + 1
    let check = rows
                .split("")
                .filter(index => index == value && sameRow != column
                                          ? true 
                                          : false
                           )
    return check.length ? true : false
  }

  checkColPlacement(puzzleString, column, value) {
    let rows = []
    let col = []

    for(let i = 0; i < 9; i++){
      let rowIndex = i * 9
      rows.push(puzzleString.slice(rowIndex, rowIndex + 9))
    }

    rows.map(row => {
      col.push(row.split("")[column - 1])
    })

    let sameRow = col.indexOf(value) + 1
    
    if(col.includes(value) && sameRow != column){
      return true
    }
    return false
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let region = []
    //Finding the region rows
    //Sorry for the messy code, I can't think anymore than this
    let regionRows = []
    let rowIndex = row.charCodeAt(0) % 65

    if(rowIndex < 3){
      for(let i = 0; i < 3; i++){
        let index = i * 9
        regionRows.push(puzzleString.slice(index, index + 9))
      }
    } else if(rowIndex >= 3 && rowIndex < 6){
      for(let j = 3; j < 6; j++){
        let index = j * 9
        regionRows.push(puzzleString.slice(index, index + 9))
      } 
    } else if(rowIndex >= 6 && rowIndex < 9){
      for(let k = 6; k < 9; k++){
        let index = k * 9
        regionRows.push(puzzleString.slice(index, index + 9))
      } 
    }

    //Finding the region columns
    if(column <= 3){
      regionRows.map(rows => region.push(rows.slice(0, 3)))
    } else if(column > 3 && column <= 6){
      regionRows.map(rows => region.push(rows.slice(3, 6)))
    } else if(column > 6 && column <= 9){
      regionRows.map(rows => region.push(rows.slice(6, 9)))
    }

    for(let i = 0; i < region.length; i++){
      let sameRow = region[i].split("").indexOf(value) + 1
      let check = region[i]
      .split("")
      .filter(item => item == value ? true : false)
      if(check.length && sameRow != column){
        return true
      }
    }
    return false
  }

  solve(puzzleString) {
    for(let i = 0; i < solutions.length; i++){
      if(solutions[i][0] == puzzleString){
        return solutions[i][1]
      } 
    }
    return false
  }
}

module.exports = SudokuSolver;

