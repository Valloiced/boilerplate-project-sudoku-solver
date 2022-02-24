'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body

      let checkPuzzle = puzzle.match(/[A-Za-z]/g)
      if(!coordinate || !value){
        return res.json({error: "Required field(s) missing"})
      } 
      
      let checkCoordinate = coordinate.match(/^[A-Za-z]\d/g)
      let checkValue = value.match(/[1-9]/)

      if(checkPuzzle){
        return res.json({error: "Invalid characters in puzzle"})
      } else if(!checkCoordinate){
        return res.json({error: "Invalid coordinate"})
      } else if(!checkValue){
        return res.json({error: "Invalid value"})
      }

      let positions = coordinate.split("")
      let rows = positions[0].toUpperCase()
      let columns = positions[1]
      let conflicts = []

      if(solver.validate(puzzle)){
        if(solver.checkRowPlacement(puzzle, rows, columns, value)){
          conflicts.push("row")
        }
        if(solver.checkColPlacement(puzzle, columns, value)){
          conflicts.push("column")
        }
        if(solver.checkRegionPlacement(puzzle, rows, columns, value)){
          conflicts.push("region")
        }

        //Decides the validity based on the conflicts array if it contains a problem
        res.json({valid: conflicts.length
                         ? false 
                         : true,
                  conflict: conflicts.length
                            ? conflicts
                            : undefined})
      } else { 
        res.json({ "error": "Expected puzzle to be 81 characters long" })
        }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let { puzzle } = req.body

      if(puzzle == undefined){
        return res.json({error: "Required field missing"})
      } else if(puzzle.match(/[A-Za-z]/g)){
        return res.json({error: "Invalid characters in puzzle"})
      }

      if(solver.validate(puzzle)){
        let testPuzzle = solver.solve(puzzle)

        if(testPuzzle.length){
          return res.json({solution: testPuzzle})
        } else {
          return res.json({error: "Puzzle cannot be solved"})
        }
      } else {
        return res.json({error: "Expected puzzle to be 81 characters long"})
      }
    });
};
