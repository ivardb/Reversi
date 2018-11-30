var gameStateObject = require("./gamestate"); 
var boardObj = require("./board"); 
var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.gameState = new gameStateObject(); //detailed state, like whose turn it is what the board is and what each players score is
    this.generalState = "0 players"; //state of connection and if game is finished or not
    this.finalStatus = false; //checks if game is finished or not
    this.board = new boardObj();
    this.addPlayer = game.prototype.addPlayer;
    this.updateValidMoves = game.prototype.updateValidMoves;
    this.capture = game.prototype.capture;
    this.updateValidMoves(this.board, 1);
    this.updateValidMoves(this.board, -1);
};

//all possible states of the game, more detailed states will be in the gameState object
game.prototype.states = {};
game.prototype.states["0 players"] = 0;
game.prototype.states["1 player"] = 1;
game.prototype.states["2 players"] = 2;
game.prototype.states["A"] = 3;
game.prototype.states["B"] = 4;
game.prototype.states["Aborted"] = 5;

//possible state changes

game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0], //0 players
    [1, 0, 1, 0, 0, 0], //1 player
    [0, 0, 0, 1, 1, 1], //2 players
    [0, 0, 0, 0, 0, 0], //A
    [0, 0, 0, 0, 0, 0], //B
    [0, 0, 0, 0, 0, 0]  //Aborted
];


//check if we can change the generalState
game.prototype.isValidTransition = function (from, to) {
    console.assert(typeof from == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof from);
    console.assert(typeof to == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof to);
    console.assert( from in game.prototype.states == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, from);
    console.assert( to in game.prototype.states == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, to);

    let i, j;
    if (! (from in game.prototype.states)) {
        return false;
    }
    else {
        i = game.prototype.states[from];
    }

    if (!(to in game.prototype.states)) {
        return false;
    }
    else {
        j = game.prototype.states[to];
    }

return (game.prototype.transitionMatrix[i][j] > 0);
};

game.prototype.isValidState = function (s) {
    return (s in game.prototype.states);
};

game.prototype.setStatus = function (w) {

    console.assert(typeof w == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof w);

    if (game.prototype.isValidState(w) && game.prototype.isValidTransition(this.generalState, w)) {
        this.generalState = w;
        console.log("[STATUS] %s", this.generalState);
    }
    else {
        return new Error("Impossible status change from %s to %s", this.generalState, w);
    }

    if(w == "A" || w =="B" || w=="Aborted") {
        this.finalStatus = true;
    }
};

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.generalState == "2 players");
};

game.prototype.addPlayer = function (p) {
    console.assert(p instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof p);

    if (this.generalState != "0 players" && this.generalState != "1 player") {
        return new Error("Invalid call to addPlayer, current state is %s", this.generalState);
    }

    /*
     * revise the game state
     */ 
    var error = this.setStatus("1 player");
    if(error instanceof Error){
        this.setStatus("2 players");
    }

    if (this.playerA == null) {
        this.playerA = p;
        return "A";
    }
    else {
        this.playerB = p;
        return "B";
    }
};

//above all methods for creating the game
//under all methods for progressing the game
game.prototype.updateValidMoves = function(board, color){
    for(var i = 0; i<8;i++) {
        for(var j = 0;j<8;j++) {
            if(game.prototype.checkMove(board, color, i, j).includes(true)) {
                this.gameState.updateMoves(i, j, color);
            }
        }
    }
};

game.prototype.checkMove = function(board, color, x, y) {
    var capSides = new Array(8).fill(false);
    if(board.getValue(board, x,y)==0) {
        var adjArray = board.getAdjacent(board, x,y);
        var adj = 0;
        for(let i = 0; i<8; i++) {
            if(adjArray[i] == color*-1) {
                if(game.prototype.checkValidCaptureSide(board, color, x,y,i)) {
                    capSides[i] = true;
                }
            }
        }
    }
    return capSides;
};

game.prototype.checkValidCaptureSide = function(board, color, x,y,i) {
    var dx=0;
    var dy=0;
    switch(i) {
        case 0: dx=-1;
                dy=-1;
                break;
        case 1: dy=-1;
                break;
        case 2: dx=1;
                dy=-1;
                break;
        case 3: dx=-1;
                break;
        case 4: dx=1;
                break;
        case 5: dx=-1;
                dy=1;
                break;
        case 6: dy=1;
                break;
        case 7: dx=1;
                dy=1;
                break;
    }
    y+=dy;
    x+=dx;
    while(board.getValue(board, x,y) == color*-1) {
        y+=dy;
        x+=dx;
    }
    if(board.getValue(board, x,y)==color) {
        return true;
    }
    return false;
}

game.prototype.capture = function(board, color, x, y) {
    board.setValue(board, x, y, color);
    capArray = game.prototype.checkValidCaptureSide(board, color, x, y);
    for(var i = 0;i<8;i++) {
        if(capArray[i] == true) {
            game.prototype.captureOneSide(board, color, x, y, i);
        }
    }
};

game.prototype.captureOneSide = function(board, color, x, y, i) {
    var dx=0;
    var dy=0;
    switch(i) {
        case 0: dx=-1;
                dy=-1;
                break;
        case 1: dy=-1;
                break;
        case 2: dx=1;
                dy=-1;
                break;
        case 3: dx=-1;
                break;
        case 4: dx=1;
                break;
        case 5: dx=-1;
                dy=1;
                break;
        case 6: dy=1;
                break;
        case 7: dx=1;
                dy=1;
                break;
    }
    y+=dy;
    x+=dx;
    while(board.getValue(board, x,y) == color*-1) {
        board.setValue(board, x, y, color);
        y+=dy;
        x+=dx;
    }
}

module.exports = game;