var socket = new WebSocket("ws://localhost:3000");
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

$("#boardTable tr td").click(function(event){
    console.log(event.target.id);

    //For testing purposes
    setValue("-1", event.target.id);

    /*
    var location = event.target.id; 
    var yLoc = letters.indexOf(location.charAt(0)) + 1;
    var xLoc = parseInt(location.charAt(1));
    console.log(xLoc + " - " + yLoc);
    var move = {type:"MOVE", x:xLoc, y:yLoc};
    socket.send(JSON.stringify(move));
    */
})

function setValue(value, location){
    if(value == 1){
        document.getElementById(location).style.backgroundImage = "url('/images/BlackPiece.png')"; 
    } else if(value == -1){
        document.getElementById(location).style.backgroundImage = "url('/images/WhitePiece.png')";
    }
}

function setScorePlayer1(score){
    document.getElementById("player1score").innerHTML = score;
}

function setScorePlayer2(score){
    document.getElementById("player2score").innerHTML = score;
}

function setNamePlayer1(name){
    document.getElementById("player1name").innerHTML = name;
}

function setNamePlayer2(name){
    document.getElementById("player2name").innerHTML = name;

}
/*
socket.on("message", function incoming(message) {

});
*/

