var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var port = process.argv[2];
var app = express();

var indexRouter = require("./routes/index");

app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);
app.get("/", indexRouter);

var server = http.createServer(app);

const wss = new WebSocket.Server({server});

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

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
        let oMsg = JSON.parse(message);
 
        let gameObj = websockets[con.id];
        let isPlayerA = (gameObj.playerA == con) ? true : false;
        
    });
});

server.listen(port);
