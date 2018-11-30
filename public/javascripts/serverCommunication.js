var socket = new WebSocket("ws://localhost:3000");
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");
var player = null;

$("#boardTable tr td").click(function(event){
    var id = String(event.target.id);
    console.log(id);

    //For testing purposes
    setValue("-1", id);

    var yLoc = letters.indexOf(id.charAt(0)); //x and y where wrong
    var xLoc = parseInt(id.charAt(1))-1;
    console.log(xLoc);
    console.log(yLoc);
    var move = {type:"move", player:player, x:xLoc, y:yLoc};
    socket.send(JSON.stringify(move));
})

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
    console.log("creating board...");
    for(i = 0; i < boardArr.length; i++){
        for(j=1; j <= boardArr[i].length; j++){
            setValue(boardArr[i][j-1], letters[i] + j); 
        }
    }
}

socket.onmessage = function incoming(message) {
    console.log(message);
    var mesObj = JSON.parse(message.data);
    if(mesObj.type == "board"){
        createBoard(mesObj.board);
    } else if(mesObj.type == "gameStart"){
        player = mesObj.player;
        createBoard(mesObj.board);
        if(player == "A"){
            document.getElementById("player1type").innerHTML = "You";
            document.getElementById("player2type").innerHTML = "Opponent";
        } else if(player == "B"){
            document.getElementById("player2type").innerHTML = "You";
            document.getElementById("player1type").innerHTML = "Opponent"
        }
    }
}

function testBoard(){
    var boardArr = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    createBoard(boardArr);
}

