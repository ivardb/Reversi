var gameStateObject = require("gamestate.js"); 
var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.gameState = new gameStateObject(); //detailed state, like whose turn it is what the board is and what each players score is
    this.generalState = "0 players"; //state of connection and if game is finished or not
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

module.exports = game;