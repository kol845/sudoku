const errorCodes = {
    MULTIPLE_SOLUTIONS: {
        code: 'MULTIPLE_SOLUTIONS',
        message: 'The given board has more then one solution',
    },
    NO_SOLUTION: {
        code: 'NO_SOLUTION',
        message: 'The given board has no possible solutions',
    },
    INVALID_INPUT_FILE: {
        code: 'INVALID_INPUT_FILE',
        message: 'The file does not contain a readable Sudoku board',
    },
}
module.exports = errorCodes;