var game = function() {
    this.scorePlayer1=2;
    this.scorePlayer2=2;
    this.state = "Starting"; //other possibilities are turnWhite, turnBlack;
    this.validMovesBlack = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
    this.validMovesWhite = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
    this.nickNameA = null; //nicknames
    this.nickNameB = null;
    this.awaitingMove = false; //signals to the client if it is expecting a move or not
    this.updateMoves = updateMoves;
    this.getValidMove = getValidMove;
    this.canMove = canMove;
    this.clear = clear;
}
function updateMoves(x, y, color) {
    if(color == 1) {
        this.validMovesBlack[y][x] = 1;
    } else {
        this.validMovesWhite[y][x] = 1;
    }
}

function getValidMove(x, y, color) {
    if(color == -1) {
        if(this.validMovesWhite[y][x] == 1) {
            return true;
        }
    } else {
        if(this.validMovesBlack[y][x] == 1) {
            return true;
        }
    }
    return false;
}

function canMove(color) {
    var res = false;
    if(color == -1) {
        for(i=0;i<8;i++) {
            if(this.validMovesWhite[i].includes(1)) {
                res = true;
            }
        }
    } else {
        for(i=0;i<8;i++) {
            if(this.validMovesBlack[i].includes(1)) {
                res = true;
            }
        }
    }
    return res;
}

function clear() {
    for(i=0;i<8;i++) {
        for(j=0;j<8;j++) {
            this.validMovesBlack[i][j] = 0;
            this.validMovesWhite[i][j] = 0;
        }
    }
}
module.exports = game;