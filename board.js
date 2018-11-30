
var board = function(){
    this.boardArray = new Array(8).fill(new Array(8).fill(0));
    this.boardArray[3][3] = -1;
    this.boardArray[4][4] = -1;
    this.boardArray[3][4] = 1;
    this.boardArray[4][5] = 1;
}

function getValue(x, y){
    return boardArray[y][x];
}

function getValueT(x, y){
    if(y <= 0)return null;
    else{
        return boarArray[y-1][x];
    }
}

function getValueB(x, y){
    if(y >= 7)return null;
    else{
        return boarArray[y+1][x];
    }
}

function getValueL(x, y){
    if(x <= 0)return null;
    else{
        return boarArray[y][x-1];
    }
}

function getValueR(x, y){
    if(x >= 7)return null;
    else{
        return boarArray[y][x+1];
    }
}

function getValueTL(){
    if(y <= 0 || x <= 0 )return null;
    else{
        return boardArray[y-1][x-1];
    }
}

function getValueTR(){
    if(y <= 0 || x >= 7 )return null;
    else{
        return boardArray[y-1][x+1];
    }
}

function getValueBL(){
    if(y >= 7 || x <= 0 )return null;
    else{
        return boardArray[y+1][x-1];
    }
}

function getValueBR(){
    if(y >= 7 || x >= 7 )return null;
    else{
        return boardArray[y+1][x+1];
    }
}

function getSurroundingPieces(x,y){
    ret = new Array(8);
    ret[0] = getValueTL(x,y);
    ret[1] = getValueT(x,y);
    ret[2] = getValueTR(x, y);
    ret[3] = getValueL(x, y);
    ret[4] = getValueR(x, y);
    ret[5] = getValueBL(x, y);
    ret[6] = getValueB(x, y);
    ret[7] = getValueBR(x, y);
}

module.exports = board;