# ChessAI

## Introduction
This is an example of ChessAI module. It uses [Chess Rules](https://github.com/ChessCorp/chess-rules) module for valid moves generation.

## Engine
This is based on Depth-Limited Minimax Algorithm.
Minimax is a simple recursive algorithm which searches entire game tree to find the best possible move. But since the tree is too big we limit the search to a certain depth.

## Evaluation function
Minimax algorithm requires an evaluation function which calculates the score of final position which determines best move.
