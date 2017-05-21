var board = [];
var moves=[];

var done =false;
var whiteTurn =true;
var squareSize =50;

var dimensions = [3,4,5,6,7,8,9];
var rules = ["any size", "not all touching", "no touching"];

var curDimension=5;
var nextDimension=5;

var currentRule = 0;
var nextRule =0;

displayBoard(curDimension);

var config = d3.select("#otherSettings");

var showMoveIds =true;
config.append('label')
    .attr('for', 'showMoves')
    .text("Show Move Numbers");
config.append('input')
  .attr('type', 'checkbox')
  .attr('checked', showMoveIds)
  .attr('id', 'showMoves')
  .on('change', function() {
      showMoveIds = this.checked;
      updateBoard();
  });
var showChecks = true;

config.append('label')
    .attr('for', 'showMoves')
    .text("Show Forced Squares");
config.append('input')
  .attr('type', 'checkbox')
  .attr('checked', showChecks)
  .attr('id', 'showMoves')
  .on('change', function() {
      showChecks = this.checked;
      updateBoard();
  });


d3.select('#dimensions')
    .append('input')
    .attr('id','dimension')
    .attr('type','number')
    .attr('value',nextDimension)
    .on('change',function(){
	nextDimension = this.value;
    });

d3.select('#dimOption'+curDimension).attr('selected','true');

d3.select('#squareSizes')
    .append('select')
    .attr('id','squareSize')
    .on('change',function(){
	console.log(d3.select(this).node().value);	
	nextRule =d3.select(this).node().value;
    }).selectAll('option')
    .data(rules)
    .enter()
    .append('option')
    .attr('id',function(d,i){return 'squareSize'+i;})
    .attr('value', function(d,i){	
	return i;
    }).text(function(d){
	return d;
    });

d3.select('#squareSize'+currentRule).attr('selected','true');

function clearBoard()
{
    done =false;
    board = [];
    moves=[];
    currentRule=nextRule;
    curDimension = nextDimension;
    whiteTurn =true;
    displayBoard(curDimension);
}

function displayBoard(dimension){
    
    d3.select('#svg-area').select('svg').remove();
    
    for (var i=0; i <dimension; i++)
    {
	for (var j =0; j <dimension; j++)
	{
	    var square = {x:j,y:i,piece:"empty",win:false};
	    board.push(square);
	}
    }
    
    var svg = d3.select('#svg-area')
	.append('svg')
	.attr('width',dimension*squareSize)
	.attr('height',dimension*squareSize);
    
    svg.selectAll('rect')
	.data(board)
	.enter()
	.append('rect')
	.attr('id', function(d){return "square"+d.x+"-"+d.y;})
	.attr('width',squareSize)
	.attr('x',function(d){ return d.x*squareSize;})
	.attr('y',function(d){ return d.y*squareSize;})
	.attr('stroke','black')
	.attr('stroke-width','3')
	.attr('height',squareSize)
	.style('fill','green')
    
    svg.selectAll('circle')
	.data(board)
	.enter()
	.append('circle')
	.attr('cx',function(d){return d.x*squareSize+0.5*squareSize;})
	.attr('cy',function(d){return d.y*squareSize+0.5*squareSize;})
	.attr('r',0.4*squareSize)
	.style('fill','green')
	.attr('id',function(d){return "circle"+d.x+"-"+d.y;})
	.on('click',function(d){
	    if (d.piece=="empty" && !done){
		d.moveId = moves.length;
		if(whiteTurn){
		    d.piece ="white";
		    moves.push({x:d.x,y:d.y,color:true});
		}
		else{
		    d.piece ="black";
		    moves.push({x:d.x,y:d.y,color:false});
		}
		whiteTurn = !whiteTurn;
		checkSquares();
		updateBoard();
	    }
	});

    svg.selectAll('text')
	.data(board)
	.enter()
	.append('text')
	.attr('x',function(d){ return d.x*squareSize + 0.5*squareSize;})
	.attr('y',function(d){ return d.y*squareSize + 0.5*squareSize;})
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'middle')
	.attr('id',function(d){return "text"+d.x+"-"+d.y;});
}

function updateBoard(){
    for (var i=0;i<curDimension; i++)
    {
	for (var j=0;j<curDimension; j++)
	{
	    var square = board[i*curDimension+j];
	    var fillColor;
	    if(square.win){
		d3.select("#square"+square.x+"-"+square.y)
		    .style('fill', 'red');
	    }
	    else if (showChecks && !done &&
		     square.check && square.piece == "empty")
	    {
                d3.select("#square"+square.x+"-"+square.y)
                    .style('fill', 'yellow');
	    }
	    else{
		d3.select("#square"+square.x+"-"+square.y)
		    .style('fill', 'green');
	    }
	    if (square.piece!="empty"){
		d3.select("#circle"+square.x+"-"+square.y)
		    .style('fill',square.piece);
	    }
	    else{
		if (showChecks && !done && square.check) {
                    d3.select("#circle"+square.x+"-"+square.y)
                      .style('fill', 'yellow');
                } else {
                    d3.select("#circle"+square.x+"-"+square.y)
                      .style('fill','green');
                }

		d3.select("#text"+square.x+"-"+square.y)
		    .text("")
	    }

            if (showMoveIds) {
                if (square.piece != "empty") {
                    var invertedColor;
                    if (square.piece == 'white') {
                        invertedColor = 'black';
                    } else {
                        invertedColor = 'white';
                    }
                    d3.select("#text"+square.x+"-"+square.y)
                      .style('fill', invertedColor)
                      .text(square.moveId + 1);
                }
	    }
	    else {
                d3.select("#text"+square.x+"-"+square.y)
		    .text("")	    
	    }
	}
    }
    
    if(done){
	d3.select('#svg-title').text("Game over");
    }
    else if (whiteTurn){
	d3.select('#svg-title').text("White's Turn");
    }
    else
    {
	d3.select('#svg-title').text("Black's Turn");
    }    
}


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
    var p5exists = pos5[0]>0 && pos5[0]<curDimension
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
	console.log("teststart");
	console.log(Math.abs(side[0])+Math.abs(side[1])>1);
	console.log("testend");
	return (Math.abs(side[0])+Math.abs(side[1]))>1;
    }
    else{
	return Math.abs(side[0])>1 || Math.abs(side[1])>1;
    }
}

function undo()
{
    var lastsquare =moves.pop();
    board[lastsquare.x +lastsquare.y*curDimension].piece="empty";
    whiteTurn=!whiteTurn;
    for(square of board){
	square.win=false;
	square.check=false;
    }
    
    done =false;
    checkSquares();
    updateBoard();
}

