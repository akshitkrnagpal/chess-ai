var chessRules = require('chess-rules');

// Piece Values

var pieceValues = {
	'P': 100,
	'N': 320,
	'B': 330,
	'R': 500,
	'Q': 900,
	'K': 20000
}

function getPieceValue(piece) {
	return pieceValues[piece.type];
}

//Position Values

var positionValues = {
	
	'P': [
		 0,  0,  0,  0,  0,  0,  0,  0,
		50, 50, 50, 50, 50, 50, 50, 50,
		10, 10, 20, 30, 30, 20, 10, 10,
		 5,  5, 10, 25, 25, 10,  5,  5,
		 0,  0,  0, 20, 20,  0,  0,  0,
		 5, -5,-10,  0,  0,-10, -5,  5,
		 5, 10, 10,-20,-20, 10, 10,  5,
		 0,  0,  0,  0,  0,  0,  0,  0
	],

	'N': [
		-50,-40,-30,-30,-30,-30,-40,-50,
		-40,-20,  0,  0,  0,  0,-20,-40,
		-30,  0, 10, 15, 15, 10,  0,-30,
		-30,  5, 15, 20, 20, 15,  5,-30,
		-30,  0, 15, 20, 20, 15,  0,-30,
		-30,  5, 10, 15, 15, 10,  5,-30,
		-40,-20,  0,  5,  5,  0,-20,-40,
		-50,-40,-30,-30,-30,-30,-40,-50,
	],

	'B': [
		-20,-10,-10,-10,-10,-10,-10,-20,
		-10,  0,  0,  0,  0,  0,  0,-10,
		-10,  0,  5, 10, 10,  5,  0,-10,
		-10,  5,  5, 10, 10,  5,  5,-10,
		-10,  0, 10, 10, 10, 10,  0,-10,
		-10, 10, 10, 10, 10, 10, 10,-10,
		-10,  5,  0,  0,  0,  0,  5,-10,
		-20,-10,-10,-10,-10,-10,-10,-20,
	],

	'R': [
		  0,  0,  0,  0,  0,  0,  0,  0,
		  5, 10, 10, 10, 10, 10, 10,  5,
		 -5,  0,  0,  0,  0,  0,  0, -5,
		 -5,  0,  0,  0,  0,  0,  0, -5,
		 -5,  0,  0,  0,  0,  0,  0, -5,
		 -5,  0,  0,  0,  0,  0,  0, -5,
		 -5,  0,  0,  0,  0,  0,  0, -5,
		  0,  0,  0,  5,  5,  0,  0,  0
	],

	'Q': [
		-20,-10,-10, -5, -5,-10,-10,-20,
		-10,  0,  0,  0,  0,  0,  0,-10,
		-10,  0,  5,  5,  5,  5,  0,-10,
		 -5,  0,  5,  5,  5,  5,  0, -5,
		  0,  0,  5,  5,  5,  5,  0, -5,
		-10,  5,  5,  5,  5,  5,  0,-10,
		-10,  0,  5,  0,  0,  0,  0,-10,
		-20,-10,-10, -5, -5,-10,-10,-20
	],

	'K': [
		-30,-40,-40,-50,-50,-40,-40,-30,
		-30,-40,-40,-50,-50,-40,-40,-30,
		-30,-40,-40,-50,-50,-40,-40,-30,
		-30,-40,-40,-50,-50,-40,-40,-30,
		-20,-30,-30,-40,-40,-30,-30,-20,
		-10,-20,-20,-20,-20,-20,-20,-10,
		 20, 20,  0,  0,  0,  0, 20, 20,
		 20, 30, 10,  0,  0, 10, 30, 20
	]
}

function getPositionValue(piece,index) {
	if ('B' === piece.side) {
		return positionValues[piece.type][63-index];
	} else {
		return positionValues[piece.type][index];
	}
}


function evaluateBoard(position) {

	var board = position.board; 
	var score = 0;
	
	for(var i = 0; i < board.length; i++) {
		var piece = board[i];
		if(piece != null) {
			if(piece.side == position.turn) {
				score += getPieceValue(piece);
				score += getPositionValue(piece,i);
			} else {
				score -= getPieceValue(piece);
				score -= getPositionValue(piece,i); 
			}
		}
	}

	return score;
}

function evaluateMoveScore(position,move,depth) {

	if(depth == 0){
		return evaluateBoard(position);
	}
	var updatedPosition = chessRules.applyMove(position,move);
	
	var bestScore = -99999;
	var moves = chessRules.getAvailableMoves(updatedPosition);
	
	for(var i=0; i < moves.length; i++) {

		var move = moves[i];
		var score = evaluateMoveScore(updatedPosition,move,depth-1);
		
		if(bestScore < score) {
			bestScore = score;
		}
	}
	console.log(bestScore);
	return bestScore;
}

function calculateBestMove(position) {

	var bestScore = -99999;
	var bestMoves = [];

	var moves = chessRules.getAvailableMoves(position);

	for(var i=0; i < moves.length; i++) {

		var move = moves[i];
		var score = evaluateMoveScore(position,move,2);
		
		if(bestScore < score) {
			bestScore = score;
			bestMoves = [];
			bestMoves.push(move);
		} else if (bestScore == score) {
			bestMoves.push(move);
		}
	}
	var random = Math.floor(Math.random()*bestMoves.length);
	return bestMoves[random];
}

module.exports.calculateBestMove = calculateBestMove;