var socket = new WebSocket("ws://localhost:3000");
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

$("#boardTable tr td").click(function(event){
    var id = String(event.target.id);
    console.log(id);

    //For testing purposes
    setValue("-1", id);

    var xLoc = letters.indexOf(id.charAt(0))+1;
    var yLoc = parseInt(id.charAt(1));
    console.log(xLoc);
    console.log(yLoc);
    var move = {type:"MOVE", x:xLoc, y:yLoc};
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
    for(i = 0; i < boardArr.length; i++){
        for(j=1; j <= boardArr[i].length; j++){
            setValue(boardArr[i][j-1], letters[i] + j); 
        }
    }
}

socket.onmessage = function incoming(message) {
    var mesObj = JSON.parse(message);
    if(mesObj.type === "board"){
        var boardArr = mesObj.board;
        createBoard(boardArr);
    } else id
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

testBoard();

