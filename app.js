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

//clean up the websockets
setInterval(function() {
    for(let i in websockets) {
        if(websockets.hasOwnProperty(i)) {
            let gameObj = websockets[i];
            if(gameObj.finalStatus==true) {
                console.log("\tDeleting element " + i);
                delete websocket[i];
            }
        }
    }
}, 50000);

wss.on("connection", function(ws) {
    console.log("Connection established");
    var gameStartObj = messages.gameStart(connect(ws), websockets[ws].board.boardArray);
    if(gameStartObj.player == "B") {
        websockets[ws].playerA.send(JSON.stringify(messages.gameStart("A", websockets[ws].board.boardArray)));
        websockets[ws].playerB.send(JSON.stringify(messages.gameStart("B", websockets[ws].board.boardArray)));
        ws.send(JSON.stringify(messages.turn(websockets[ws].gameState.validMovesBlack)));
        console.log("Player B turn");
    }  

    ws.on("message", function incoming(message) {
        //console.log("[LOG] " + message);
        var gameObj  = websockets[ws];
        var mesObj = JSON.parse(message);
        var playerType = mesObj.player;
        var messageType = mesObj.type;
        if(playerType == "A") {
            var color = -1;
        } else {
            var color = 1;
        }
        if(mesObj.type == "move") {
            console.log(playerType);
            //console.log("\t[move]Player " + playerType + " made the following move: " + mesObj.x + mesObj.y);
            if(playerType == "A") {
                gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y);
                gameObj.updateValidMoves(gameObj.board, color);
                gameObj.updateValidMoves(gameObj.board, color*-1);
                gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray)));
                gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray)));
                if(gameObj.gameState.canMove(color*-1)) {
                    gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)));
                    console.log("Player B turn");
                } else {
                    gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)));
                    console.log("Player A turn");
                }
            } else {
                gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y);
                gameObj.updateValidMoves(gameObj.board, color);
                gameObj.updateValidMoves(gameObj.board, color*-1);
                console.log(gameObj.gameState.validMovesBlack);
                gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray)));
                gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray)));
                if(gameObj.gameState.canMove(color*-1)) {
                    gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)));
                    console.log("Player A turn");
                } else {
                    gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)));
                    console.log("Player B turn");
                }
            }
        }
        if(mesObj.type == "concede") {

        }
    });
});

function connect(ws) {
    if(currentGame.generalState == "0 players" || currentGame.generalState == "1 player") {
        websockets[ws] = currentGame;
        var player = currentGame.addPlayer(ws);
    } else {
        currentGame = new game(id++);
        websockets[ws] = currentGame;
        var player = currentGame.addPlayer(ws);
    }
    return player;
}
server.listen(port);
