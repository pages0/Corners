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





/* 
function boardEval(board,moves,dimension, AIColor){
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
    
    var foundSquare=false;
    for (var i=0; i < moves.length && !foundSquare; i++){
	var corner1 =moves[i];
	for (var j=i+1; j <moves.length && !foundSquare;j++){
	    var corner2 = moves[j];
	    if (corner1.color == corner2.color){
		side = [corner1.x-corner2.x,
			corner1.y-corner2.y]
		if(corner2.color && sideLongEnough(side)){
		    foundSquare |= checkSquare([corner1.x,corner1.y],
					     [corner2.x,corner2.y],
					     side,moveBoard,1);
		}
		else if (sideLongEnough(side)){
		    foundSquare |= checkSquare([corner1.x,corner1.y],
					     [corner2.x,corner2.y],
					     side,moveBoard,-1);
		}
	    }
	}
    }
    done = foundSquare;
}
*/
