var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {

     board = [
        [0, 0, 7, 1, 0, 0, 0, 6, 0],
        [1, 0, 5, 2, 0, 8, 0, 0, 0],
        [6, 0, 0, 0, 0, 7, 1, 2, 0],
        [3, 1, 2, 4, 0, 5, 0, 0, 8],
        [0, 0, 6, 0, 9, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 1],
        [0, 0, 1, 0, 0, 4, 9, 8, 6],
        [8, 0, 3, 9, 0, 6, 0, 0, 0],
        [0, 6, 0, 0, 8, 2, 7, 0, 3],
    ];
    FillBoard(board);


};


SolvePuzzle.onclick = function () {
    SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
    if (i == n) {
        FillBoard(board);
        return true;
    }

    if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] != 0) {
        return SudokuSolver(board, i, j + 1, n);
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, i, j, num, n)) {
            board[i][j] = num;
            let subans = SudokuSolver(board, i, j + 1, n);
            if (subans) {
                return true;
            }
            //backtrack->
            board[i][j] = 0;

        }
    }
    return false;

}

function isValid(board, i, j, num, n) {
    for (let x = 0; x < n; x++) {
        if (board[i][x] == num) {
            return false;
        }
    }

    for (let x = 0; x < n; x++) {
        if (board[x][j] == num) {
            return false;
        }
    }
    let rn = Math.sqrt(n);
    let si = i - i % rn;
    let sj = j - j % rn;

    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (board[x][y] == num) {
                return false;
            }
        }
    }
    return true;
}
