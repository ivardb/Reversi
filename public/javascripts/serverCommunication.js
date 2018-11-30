var socket = new WebSocket("ws://localhost:3000");
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");
var player = null;
var myTurn = false;
var validOptions = null;
var currentBoard = null;
var blackScore;
var whiteScore;
var gameStart = null;

$("#boardTable tr td").click(function(event){
    if(myTurn === true){
        myTurn = false;
        var id = String(event.target.id);
        console.log(id);
        move(id);
    } else {
        window.alert("Not your turn!");
    }
});

function move(loc){
    removeValidOptions(validOptions);
    var yLoc = letters.indexOf(loc.charAt(0));
    var xLoc = parseInt(loc.charAt(1))-1;
    if(validOptions[yLoc][xLoc] == 1){
        var move = {type:"move", player:player, x:xLoc, y:yLoc};
        socket.send(JSON.stringify(move));
        validOptions = null;
    } else {
        window.alert("Not a valid option!");
        myTurn = true;
        drawValidOptions(validOptions);
    }
}

function setValue(value, location){
    if(value == 1){
        document.getElementById(location).style.backgroundImage = "url('/images/BlackPiece.png')"; 
    } else if(value == -1){
        document.getElementById(location).style.backgroundImage = "url('/images/WhitePiece.png')";
    }
}

function setScorePlayer1(score){
    document.getElementById("player1score").innerHTML = "Score: " + score;
}

function setScorePlayer2(score){
    document.getElementById("player2score").innerHTML = "Score: " + score;
}

function setNamePlayer1(name){
    document.getElementById("player1name").innerHTML = name;
}

function setNamePlayer2(name){
    document.getElementById("player2name").innerHTML = name;
}

function createBoard(boardArr){
    for(i = 0; i < boardArr.length; i++){
        for(j=1; j <= boardArr[i].length; j++){
            setValue(boardArr[i][j-1], letters[i] + j); 
        }
    }
}

function drawValidOptions(validOptions){
    console.log("drawing valid options");
    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            var id = letters[i] + (j+1);
            if(validOptions[i][j] == 1){
                document.getElementById(id).style.backgroundImage = "url('images/vmove.png')";
            }
        }
    }
}

function removeValidOptions(validOptions){
    console.log("removing the valid options");
    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            var id = letters[i] + (j+1);
            if(validOptions[i][j] == 1){
                document.getElementById(id).style.backgroundImage = "none";
            }
        }
    }
}

function calculateScore(){
    blackScore = 0;
    whiteScore = 0;
    for(i = 0; i < 8; i++){
        for(j=1; j<= currentBoard[i].length; j++){
            var id = letters[i] + j;
            if(currentBoard[j-1][i] == 1){
                blackScore++;
            } else if(currentBoard[j-1][i] == -1){
                whiteScore++;
            }
        }
    }
    document.getElementById("player1score").innerHTML = whiteScore;
    document.getElementById("player2score").innerHTML = blackScore;
}

socket.onmessage = function incoming(message) {
    console.log(message);
    var mesObj = JSON.parse(message.data);
    if(mesObj.type == "board"){
        document.getElementById("player1score").innerHTML = mesObj.scoreA;
        document.getElementById("player2score").innerHTML = mesObj.scoreB;
        createBoard(mesObj.board);
        currentBoard = mesObj.board;
    } else if(mesObj.type == "gameStart"){
        player = mesObj.player;
        createBoard(mesObj.board);
        currentBoard = mesObj.board;
        document.getElementById("player1score").innerHTML = mesObj.scoreA;
        document.getElementById("player2score").innerHTML = mesObj.scoreB;
        if(player == "A"){
            document.getElementById("player1type").innerHTML = "You";
            document.getElementById("player2type").innerHTML = "Opponent";
        } else if(player == "B"){
            document.getElementById("player2type").innerHTML = "You";
            document.getElementById("player1type").innerHTML = "Opponent";
        } 
        timer();
        for(i = 0; i < validOptions.length; i++){
        for(j=1; j<= validOptions.length; j++){
            var id = letters[i] + j;
            if(validOptions[j-1][i] == 1){
                document.getElementById(id).style.backgroundImage = "none";
            }
        }

    }
    } else if(mesObj.type="turn"){
        myTurn = true;
        console.log(myTurn);
        validOptions = mesObj.valid;
        drawValidOptions(mesObj.valid);
    } else if(mesObj.type="gameEnd"){
        if(mesObj.ending == player){
            window.alert("You won!");
        } else if(mesObj.ending == "draw"){
            window.alert("Draw!");
        } else {
            window.alert("You lost!");
        }
    }
}