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
        if(this.validMovesWhite[x][y] == 1) {
            return true;
        }
    } else {
        if(this.validMovesBlack[x][y] == 1) {
            return true;
        }
    }
    return false;
}
module.exports = game;