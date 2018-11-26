var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var port = process.argv[2];
var app = express();

var indexRouter = require("./routes/index");

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on("connection", function(ws) {
    console.log("Connection established");

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });
});

app.get("/play", indexRouter);
app.get("/", indexRouter);

server.listen(port);
