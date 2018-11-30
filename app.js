var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var port = process.argv[2];
var app = express();
var game = require("./game");

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
    var initConnect = {};
    initConnect.player = connect(ws);
    initConnect.type = "gameStart";
    initConnect.board = websockets[ws].board.boardArray;
    console.log(JSON.stringify(initConnect));
    ws.send(JSON.stringify(initConnect));

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
        var gameObj  = websockets[ws];
        var mesObj = JSON.parse(message);
        var playerType = mesObj.player;
        var messageType = mesObj.type;
        if(mesObj.type == "move") {
            console.log("\t[move]Player " + playerType + " made the following move: " + mesObj.x + mesObje.y);
            if(playerType == "A") {
                console.log(gameObj.gameState.getValidMove(mesObj.x, mesObj.y, 1));
            } else {
                console.log(gameObj.gameState.getValidMove(mesObj.x, mesObj.y, -1));
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
