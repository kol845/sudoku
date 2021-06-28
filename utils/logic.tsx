
const errorCodes = require('../constants/errorCodes')
const constants = require('../constants/constants')

let solvedBoard:string[][] = [] // Used to store first valid board found
export const solve = (board:(string)[][]): [solution:string[][], difficulty:string]=>{    
    solvedBoard = [];
    let difficulty = estimateDifficulty(board)
    let solution = recursiveSolve(board)
    if(solution.length==0){
        throw errorCodes.NO_SOLUTION
    }
    
    
    return [solution, difficulty]
}

/*
Algorithm:
    1. Find first empty square
    2. Fill with 1-9. This creates 9 new boards
    3. Validate the new boards
    4. Do step 1 again with each new valid board
*/
const recursiveSolve = (board:(string)[][]): string[][]=>{
    if(isSolved(board)){
        return board;
    }else{
        let newBoards = createBoards(board);
        let validBoards = validateBoards(newBoards);
        for(let i in validBoards){
            let solved = recursiveSolve(validBoards[i])
            if(solved.length!=0 && solved != solvedBoard){ // Found solution!
                if(solved.length!=0){
                    solvedBoard = solved;
                }else{ // If a second solution was found
                    throw errorCodes.MULTIPLE_SOLUTIONS
                }
            }
        }
    }
    return solvedBoard;
}

/**
 *
 * Validates boards
 * Loops trough each square in each board and validate Row, Column and Block.
 * 
 * @param {string[][][]} boards - A array of 9 altered boards
 * @return {string[][][]} Array of boards that are valid
 *  
 */
const validateBoards = (boards:(string)[][][]):(string)[][][]=>{
    let validBoards = [...boards]
    let board;
    for(let b = 0; b<9; b++){
        board = boards[b]
        for(let y = 0; y<9; y++){
            for(let x = 0; x<9; x++){
                if(board[y][x]!=null){
                    let validRow = checkRow(board, x, y)
                    let validColumn = checkColumn(board, x, y)
                    let validBlock = checkBlock(board, x, y)
                    if(!validRow || !validColumn|| !validBlock){
                        validBoards[b] = []
                        break;
                    }
                }
            }
            if(validBoards[b].length == 0) break; // If current board was deemed invalid 
        }
    }
    validBoards = validBoards.filter(function (b) { // Remove invalid/null boards
        return b.length!=0;
    });
    return validBoards;
}

const checkRow = (board:(string)[][], x:number, y:number):boolean =>{
    for(let i = 0; i<9; i++){
        if(i!=x && board[y][i] == board[y][x]){
            return false;
        }
    }
    return true;
}

const checkColumn = (board:(string)[][], x:number, y:number):boolean =>{
    for(let i = 0; i<9; i++){
        if(i!=y && board[i][x] == board[y][x]){
            return false;
        }
    }
    return true;
}

const checkBlock = (board:(string)[][], x:number, y:number):boolean =>{
    let [bX, bY] = getBlock(x,y);
    for(let i = 0; i<3; i++){
        let cX = bX*3 + i
        for(let j = 0; j<3; j++){
            let cY = bY*3 + j
            if(!(cX == x && cY == y)){
                if(board[cY][cX]==board[y][x]){
                    return false;
                }
            }
        }
    }
    return true;
}

const getBlock = (x:number, y:number):number[] =>{
    let [bX, bY] = [0,0];
    while(x>2){
        x-=3;
        bX++;
    }
    while(y>2){
        y-=3;
        bY++;
    }
    return [bX, bY];
}

const createBoards= (origBoard: (string)[][]): (string)[][][] =>{
    let boards = new Array(9)
    for(let i = 0; i<9; i++){ // Deep spread to copy array
        boards[i] = new Array(9)
        for(let j = 0; j<9; j++){
            boards[i][j] = [...origBoard[j]]
        }
    }
    let [x, y] = getEmptySquare(origBoard)
    for(let i = 0; i<9; i++){
        boards[i][y][x] = (i+1).toString()        
    }
    return boards
}

const getEmptySquare = (board: (string)[][]):number[]=>{
    for(let i = 0; i<9; i++){
        for(let j = 0; j<9; j++){
            if(board[i][j]==null){
                return [j, i];
            }
        }
    }
    return [0,0]; // This condition is impossible to reach
}

/**
 *
 * Checks if board is solved
 *  
 */
const isSolved = (board:(string)[][]):boolean=>{
    for(let i in board){
        for(let j in board[i]){
            if(board[i][j]==null){
                return false
            }
        }
    }
    return true;
}

/**
 *
 * Transforms the board from text form to array form
 *  
 */
export const interpretInput = (input:string): string[][]=>{
    let lines = input.split("\n");
  
    lines = lines.filter(function (el) { // Remove empty lines
      return el != "";
    });
  
    if(lines.length<9){
      throw errorCodes.INVALID_INPUT_FILE
    }
  
    let board = new Array(9)
    for(let i = 0; i<9;i++){
        lines[i] = lines[i].replace(" ", ""); // Remove all spaces
        lines[i] = lines[i].replace("\t", ""); // Remove all tabs
        if(lines[i].length!=9){
            throw errorCodes.INVALID_INPUT_FILE
        }

        board[i] = lines[i].split("")
        for(let j = 0; j<9;j++){ // Loop through each square and add 'null' to empty squares
            if(isNaN(board[i][j]) || board[i][j] == "0"){
            board[i][j] = null
            }
        }
    }
    return board;
  
}
/**
 *
 * Estimates the difficulty of a board by simply counting the known squares
 *  
 */
const estimateDifficulty = (board:string[][]):string=>{
    const squareCount = countSquares(board);
    let closestCount = constants.difficulties["easy"]
    let closestDifficulty = "easy"
    for(let difficulty in constants.difficulties){
        if(Math.abs(squareCount-constants.difficulties[difficulty])<Math.abs(closestCount-constants.difficulties[difficulty])){
            closestCount = squareCount
            closestDifficulty = difficulty
        }
    }
    return closestDifficulty;
}

/**
 *
 * Counts the known squares of a board
 *  
 */
const countSquares = (board:string[][]):number =>{
    let count = 0
    for(let i in board)
        for(let j in board[i]){
            if(board[i][j] != null) count++
        }
    return count;
}