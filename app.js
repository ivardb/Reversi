var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var port = process.argv[2];
var app = express();
var game = require("./game");
var messages = require("./messages");

var indexRouter = require("./routes/index");

app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);
app.get("/", indexRouter);

var server = http.createServer(app);

const wss = new WebSocket.Server({server});
var id = 0;
var currentGame = new game(id++);

var websockets = {}; //property websocket, value: game
var connectionID = 0;

//clean up the websockets
setInterval(function() {
    for(let i in websockets) {
        if(websockets.hasOwnProperty(i)) {
            let gameObj = websockets[i];
            if(gameObj.finalStatus==true) {
                console.log("\tDeleting element " + i);
                delete websockets[i];
            }
        }
    }
}, 50000);

wss.on("connection", function(ws) {
    console.log("Connection established");
    let con = ws;
    con.id = connectionID++;
    if(currentGame.generalState == "0 players" || currentGame.generalState == "1 player") {
        var player = currentGame.addPlayer(con);
        websockets[con.id] = currentGame;
    } else {
        currentGame = new game(id++);
        websockets[con.id] = currentGame;
        var player = currentGame.addPlayer(con);
    }
    var gameStartObj = messages.gameStart(player, websockets[con.id].board.boardArray);
    if(gameStartObj.player == "B") {
        websockets[con.id].playerA.send(JSON.stringify(messages.gameStart("A", websockets[con.id].board.boardArray, websockets[con.id].gameState.scorePlayerA, websockets[con.id].gameState.scorePlayerB)));
        websockets[con.id].playerB.send(JSON.stringify(messages.gameStart("B", websockets[con.id].board.boardArray, websockets[con.id].gameState.scorePlayerA, websockets[con.id].gameState.scorePlayerB)));
        con.send(JSON.stringify(messages.turn(websockets[con.id].gameState.validMovesBlack)));
        console.log("Player B turn");
    }  

    ws.on("message", function incoming(message) {
        console.log("[LOG:" + websockets[con.id].id + "] " + message);
        let gameObj  = websockets[con.id];
        let mesObj = JSON.parse(message);
        let playerType = mesObj.player;
        let messageType = mesObj.type;
        if(playerType == "A") {
            var color = -1;
        } else {
            var color = 1;
        }
        if(mesObj.type == "move") {
            if(playerType == "A") {
                gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y);
                gameObj.gameState.calculateScore(gameObj.board);
                gameObj.gameState.clear();
                gameObj.updateValidMoves(gameObj.board, color);
                gameObj.updateValidMoves(gameObj.board, color*-1);
                gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)));
                gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)));
                if(gameObj.gameState.canMove(color*-1)) {
                    gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)));
                    console.log("Player B turn");
                } else if(gameObj.gameState.canMove(color)) {
                    gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)));
                    console.log("Player A turn");
                } else {
                    endGame(gameObj);
                }
            } else {
                gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y);
                gameObj.gameState.calculateScore(gameObj.board);
                gameObj.gameState.clear();
                gameObj.updateValidMoves(gameObj.board, color);
                gameObj.updateValidMoves(gameObj.board, color*-1);
                gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)));
                gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)));
                if(gameObj.gameState.canMove(color*-1)) {
                    gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)));
                    console.log("Player A turn");
                } else if(gameObj.gameState.canMove(color)) {
                    gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)));
                    console.log("Player B turn");
                } else {
                    endGame(gameObj);
                }
            }
        }
        if(mesObj.type == "concede") {
            if(ws == gameObj.playerA) {
                endGame(gameObj, "B");
                gameObj.setStatus("B");
            } else {
                endGame(gameObj, "A");
                gameObj.setStatus("A");
            }
        }
    });
});

/*function connect(ws) {
    let con = ws;
    con.id = connectionID++;
    if(currentGame.generalState == "0 players" || currentGame.generalState == "1 player") {
        var player = currentGame.addPlayer(con);
        websockets[con.id] = currentGame;
    } else {
        currentGame = new game(id++);
        websockets[con.id] = currentGame;
        var player = currentGame.addPlayer(con);
    }
    return player;
}*/

function endGame(gameObj) {
    winner = "draw";
    if(gameObj.gameState.scorePlayerA>gameObj.gameState.scorePlayerB) {
        winner = "A";
        gameObj.setStatus("A");
    } else if(gameObj.gameState.scorePlayerB>gameObj.gameState.scorePlayerA) {
        winner = "B";
        gameObj.setStatus("B");
    }
    if(arguments[1] != undefined) {
        winner = argument[1];
    }
    gameEndMessage = messages.gameEnd(winner, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB);
    gameObj.playerA.send(JSON.stringify(gameEndMessage));
    gameObj.playerB.send(JSON.stringify(gameEndMessage));
    console.log(winner + " has won.");
}

server.listen(port);
