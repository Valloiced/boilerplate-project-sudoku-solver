const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        let testing = solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isTrue(testing)
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        let testing = solver.validate('AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isFalse(testing)
    })

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        let testing = solver.validate('.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isFalse(testing)
    })

    test('Logic handles a valid row placement', () => {
        let testing = solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 2, 2)
        assert.isFalse(testing)
    })

    test('Logic handles an invalid row placement', () => {
        let testing = solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 2, 1)
        assert.isTrue(testing)
    })

    test('Logic handles a valid column placement', () => {
        let testing = solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 2, '6')
        assert.isFalse(testing)
    })

    test('Logic handles an invalid column placement', () => {
        let testing = solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 2, '9')
        assert.isTrue(testing)
    })

    test('Logic handles a valid region (3x3 grid) placement', () => {
        let testing = solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 2, '1')
        assert.isFalse(testing)
    })

    test('Logic handles an invalid region (3x3 grid) placement', () => {
        let testing = solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'A', 2, '2')
        assert.isTrue(testing)
    })

    test('Valid puzzle strings pass the solver', () => {
        let testing = solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isNotFalse(testing)
    })

    test('Invalid puzzle strings fail the solver', () => {
        let testing = solver.solve('.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isFalse(testing)
    })
    
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        let testing = solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.equal(testing, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
    })
});
