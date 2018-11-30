
var board = function(){
    this.boardArray = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
    this.boardArray[4][3] = 1;
    this.boardArray[3][4] = 1;
    this.boardArray[4][4] = -1;
    this.boardArray[3][3] = -1;
    this.getValue = board.prototype.getValue;
    this.getAdjacent = getAdjacent;
    this.setValue = setValue;
}

function setValue(board, x, y, color) {
    board.boardArray[y][x] = color;
}

board.prototype.getValue = function(board, x, y){
    return board.boardArray[y][x];
};

function getValueT(board, x, y){
    if(y <= 0)return null;
    else{
        return board.boardArray[y-1][x];
    }
}

function getValueB(board, x, y){
    if(y >= 7)return null;
    else{
        return board.boardArray[y+1][x];
    }
}

function getValueL(board, x, y){
    if(x <= 0)return null;
    else{
        return board.boardArray[y][x-1];
    }
}

function getValueR(board, x, y){
    if(x >= 7)return null;
    else{
        return board.boardArray[y][x+1];
    }
}

function getValueTL(board, x, y){
    if(y <= 0 || x <= 0 )return null;
    else{
        return board.boardArray[y-1][x-1];
    }
}

function getValueTR(board, x, y){
    if(y <= 0 || x >= 7 )return null;
    else{
        return board.boardArray[y-1][x+1];
    }
}

function getValueBL(board, x, y){
    if(y >= 7 || x <= 0 )return null;
    else{
        return board.boardArray[y+1][x-1];
    }
}

function getValueBR(board, x, y){
    if(y >= 7 || x >= 7 )return null;
    else{
        return board.boardArray[y+1][x+1];
    }
}

function getAdjacent(board, x,y){
    ret = new Array(8);
    ret[0] = getValueTL(board, x,y);
    ret[1] = getValueT(board, x,y);
    ret[2] = getValueTR(board, x, y);
    ret[3] = getValueL(board, x, y);
    ret[4] = getValueR(board, x, y);
    ret[5] = getValueBL(board, x, y);
    ret[6] = getValueB(board, x, y);
    ret[7] = getValueBR(board, x, y);
    return ret;
}

module.exports = board;