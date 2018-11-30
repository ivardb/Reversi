var game = function() {
    this.scorePlayer1=2;
    this.scorePlayer2=2;
    this.state = "Starting"; //other possibilities are turnWhite, turnBlack;
    this.validMovesBlack = new Array(8).fill(new Array(8).fill(0)); //used to see if it is possible for black to make a move
    this.validMovesWhite = new Array(8).fill(new Array(8).fill(0)); //same for white
    this.nickNameA = null; //nicknames
    this.nickNameB = null;
    this.awaitingMove = false; //signals to the client if it is expecting a move or not
    this.updateMoves = updateMoves;
    this.getValidMove = getValidMove;
}
function updateMoves(x, y, color) {
    if(color == 1) {
        validMovesBlack[y][x] = 1;
    } else {
        validMovesWhite[y][x] = 1;
    }
}

function getValidMove(x, y, color) {
    if(color == -1) {
        if(validMovesWhite[x][y] == 1) {
            return true;
        }
    } else {
        if(validMovesBlack[x][y] == 1) {
            return true;
        }
    }
    return false;
}
module.exports = game;