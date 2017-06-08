function AIMove(){
    if (AIColor == whiteTurn && !done)
    {
	var move = AIMoveSearch(board,moves,curDimension,AIColor);
	pieceAt([move.x,move.y]).moveId =moves.length;
	moves.push(move);
	if (AIColor){
	    pieceAt([move.x,move.y]).piece ="white"
	}
	else{
	    pieceAt([move.x,move.y]).piece ="black"
	}
	whiteTurn = !whiteTurn;
    }    
}

function AIMoveSearch(board,moves,curDimension,AIColor)
{
    var moveBoard = generateMoveBoard(moves);
    var squaresEval = ProcessSquares(moves);
    var move;
    if(squaresEval.checks.length>0){
	for (pos of squaresEval.checks)
	{
	    if (moveBoard[pos[0]][pos[1]]==0){
		move ={x:pos[0],y:pos[1],color:AIColor};
		return move;
	    }
	}
    }
    if (squaresEval.corners.length>0){
	for (pos of squaresEval.corners)
	{
	    if (moveBoard[pos[0]][pos[1]]==0){
		move ={x:pos[0],y:pos[1],color:AIColor};
		return move;
	    }
	}
    }
    else{
	for (var i =0; i < curDimension; i++){
	    for (var j =0; j <curDimension; j++){	    
		if( moveBoard[i][j]==0){
		    return {x:i, y:j, color:AIColor};
		}
	    }
	}
    }
    
}
