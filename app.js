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
    var player = connect(ws);
    ws.send(JSON.stringify(player));

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
        var mesObj = JSON.parse(message);
        var playerType = mesObj.player;
        var messageType = mesObj.type;
        if(mesObj.type == "move") {
            console.log("Player " + playerType + " made the following move: " + mesObj.move);
        }
        if(mesObj.type == "concede") {

        }
    });
});

function connect(ws) {
    console.log("Connecting player to game");
    if(currentGame.generalState == "0 players" || currentGame.generalState == "1 player") {
        websockets[ws] = currentGame;
    } else {
        currentGame = new game(id++);
    }
    
}
server.listen(port);
