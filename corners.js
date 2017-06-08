function checkSquares(){
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

function checkSquare(pos1,pos2,side,moveBoard,color){    
    var pos3 = [pos1[0]+side[1],pos1[1]-side[0]];
    var pos4 = [pos2[0]+side[1],pos2[1]-side[0]];
    var pos5 = [pos1[0]-side[1],pos1[1]+side[0]];
    var pos6 = [pos2[0]-side[1],pos2[1]+side[0]];
    var p3exists = pos3[0]>=0 && pos3[0]<curDimension
	&& pos3[1]>=0 && pos3[1]<curDimension;
    var p3good =p3exists && moveBoard[pos3[0]][pos3[1]] == color;
    var p4exists = pos4[0]>=0 && pos4[0]<curDimension
	&& pos4[1]>=0 && pos4[1]<curDimension;
    var p4good = p4exists && moveBoard[pos4[0]][pos4[1]] == color;
    var p5exists = pos5[0]>=0 && pos5[0]<curDimension
	&& pos5[1]>=0 && pos5[1]<curDimension;
    var p5good = p5exists && moveBoard[pos5[0]][pos5[1]] == color;
    var p6exists = pos6[0]>=0 && pos6[0]<curDimension
	&& pos6[1]>=0 && pos6[1]<curDimension;
    var p6good = p6exists && moveBoard[pos6[0]][pos6[1]] == color;
    if(p3exists && p4exists){
        if (p3good && p4good) {
            pieceAt(pos1).win = true;
            pieceAt(pos2).win = true;
            pieceAt(pos3).win = true;
            pieceAt(pos4).win = true;
	    return true;
	}
	else if (p3good) {
            pieceAt(pos4).check = true;
        }
	else if (p4good) {
            pieceAt(pos3).check = true;
        }
    }
    if(p5exists && p6exists){
	if (p5good && p6good) {
            pieceAt(pos1).win = true;
            pieceAt(pos2).win = true;
            pieceAt(pos5).win = true;
            pieceAt(pos6).win = true;
	    return true;
	}
	else if (p5good) {
            pieceAt(pos6).check = true;
        }
	else if (p6good) {
            pieceAt(pos5).check = true;
        }
    }
    return false;
}

function pieceAt(pos) {
    return board[pos[0] + pos[1]*curDimension];
}

function sideLongEnough(side){
    if(currentRule==0){
	return true;	
    }
    else if(currentRule==1){
	return (Math.abs(side[0])+Math.abs(side[1]))>1;
    }
    else{
	return Math.abs(side[0])>1 || Math.abs(side[1])>1;
    }
}


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
