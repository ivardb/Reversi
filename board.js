
var board = function(){
    //this.boardArray = new Array(8).fill(new Array(8).fill(0));
    this.boardArray = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
    this.boardArray[4][3] = 1;
    this.boardArray[3][4] = 1;
    this.boardArray[4][4] = -1;
    this.boardArray[3][3] = -1;
    console.log(this.boardArray);
    this.getValue = board.prototype.getValue;
    this.getAdjacent = getAdjacent;
}

board.prototype.getValue = function(x, y){
    return this.boardArray[y][x];
};

function getValueT(x, y){
    if(y >= 0)return null;
    else{
        return this.boardArray[y-1][x];
    }
}

function getValueB(x, y){
    if(y <= 7)return null;
    else{
        return this.boardArray[y+1][x];
    }
}

function getValueL(x, y){
    if(x >= 0)return null;
    else{
        return this.boardArray[y][x-1];
    }
}

function getValueR(x, y){
    if(x <= 7)return null;
    else{
        return this.boardArray[y][x+1];
    }
}

function getValueTL(x, y){
    if(y >= 0 || x >= 0 )return null;
    else{
        return this.boardArray[y-1][x-1];
    }
}

function getValueTR(x, y){
    if(y >= 0 || x <= 7 )return null;
    else{
        return this.boardArray[y-1][x+1];
    }
}

function getValueBL(x, y){
    if(y <= 7 || x >= 0 )return null;
    else{
        return this.boardArray[y+1][x-1];
    }
}

function getValueBR(x, y){
    if(y <= 7 || x <= 7 )return null;
    else{
        return this.boardArray[y+1][x+1];
    }
}

function getAdjacent(x,y){
    ret = new Array(8);
    ret[0] = getValueTL(x,y);
    ret[1] = getValueT(x,y);
    ret[2] = getValueTR(x, y);
    ret[3] = getValueL(x, y);
    ret[4] = getValueR(x, y);
    ret[5] = getValueBL(x, y);
    ret[6] = getValueB(x, y);
    ret[7] = getValueBR(x, y);
    return ret;
}

module.exports = board;