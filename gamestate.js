var game = function() {
    this.scorePlayer1=2;
    this.scorePlayer2=2;
    this.state = "Starting"; //other possibilities are turnWhite, turnBlack;
    this.validMovesBlack = new Array(64).fill(0); //used to see if it is possible for black to make a move
    this.validMovesWhite = new Array(64).fill(0); //same for white
    this.nickNameA = null; //nicknames
    this.nickNameB = null;
    this.awaitingMove = false; //signals to the client if it is expecting a move or not
}
function updateMoves(location, color) {
    if(color == black) {
        validMovesBlack[location] = 1;
    } else {
        validMovesWhite[location] = 1;
    }
}
module.exports = game;