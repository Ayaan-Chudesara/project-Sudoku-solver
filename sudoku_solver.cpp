#include <iostream>
#include <math.h>
using namespace std;

void Print(int board[9][9], int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

bool isValid(int board[9][9], int i, int j, int num, int n)
{
    for (int x = 0; x < n; x++)
    {
        if (board[i][x] == num)
        {
            return false;
        }
    }

    for (int x = 0; x < n; x++)
    {
        if (board[x][j] == num)
        {
            return false;
        }
    }
    int rn = sqrt(n);
    int si = i - i % rn;
    int sj = j - j % rn;

    for (int x = si; x < si + rn; x++)
    {
        for (int y = sj; y < sj + rn; y++)
        {
            if (board[x][y] == num)
            {
                return false;
            }
        }
    }
    return true;
}

bool SudokuSolver(int board[9][9], int i, int j, int n)
{
    if (i == 9)
    {
       
        return true;
    }

    if (j == 9)
    {
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] != 0)
    {
        return SudokuSolver(board, i, j + 1, n);
    }

    for (int num = 1; num <= 9; num++)
    {
        if (isValid(board, i, j, num, n))
        {
            board[i][j] = num;
            bool subans = SudokuSolver(board, i, j + 1, n);
            if (subans)
            {
                return true;
            }
            // backtrack->
            board[i][j] = 0;
        }
    }
    return false;
}

int main()
{
    int n = 9;

    int board[9][9] = {
        {0, 0, 7, 1, 0, 0, 0, 6, 0},
        {1, 0, 5, 2, 0, 8, 0, 0, 0},
        {6, 0, 0, 0, 0, 7, 1, 2, 0},
        {3, 1, 2, 4, 0, 5, 0, 0, 8},
        {0, 0, 6, 0, 9, 0, 2, 0, 0},
        {0, 0, 0, 0, 0, 3, 0, 0, 1},
        {0, 0, 1, 0, 0, 4, 9, 8, 6},
        {8, 0, 3, 9, 0, 6, 0, 0, 0},
        {0, 6, 0, 0, 8, 2, 7, 0, 3},
    };

    if(SudokuSolver(board, 0, 0, n)){
        Print(board,n);
    };

    return 0;
}
