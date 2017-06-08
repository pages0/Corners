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
    var moveBoard = []
    for (var i=0; i<curDimension;i++){
	var row =[];
	for (var j=0; j<curDimension;j++){
	    row.push(0);
	}
	moveBoard.push(row);
    }
    for (var move of moves){
	if(move.color)
	{
	    moveBoard[move.x][move.y]=1;
	}
	else
	{
	    moveBoard[move.x][move.y]=-1;
	}	
    }

    for (var i =0; i < curDimension; i++){
	for (var j =0; j <curDimension; j++){	    
	    if( moveBoard[i][j]==0){
		return {x:i, y:j, color:AIColor};
	    }
	}
    }
    
}
