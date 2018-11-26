var game = function() {
    this.scorePlayer1=2;
    this.scorePlayer2=2;
    this.state = "Starting"; //other possibilities are turnWhite, turnBlack;
    this.validMovesBlack = true; //used to see if it is possible for black to make a move
    this.validMovesWhite = true; //same for white
    this.nickNameA = null; //nicknames
    this.nickNameB = null;
    this.awaitingMove = false; //signals to the client if it is expecting a move or not
}