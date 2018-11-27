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
    console.log("start of setValue method");
    if(value == 1){
        document.getElementById(location).style.backgroundImage = "url('/images/BlackPiece.png')"; 
    } else if(value == -1){
        document.getElementById(location).style.backgroundImage = "url('/images/WhitePiece.png')";
    }
}

socket.on("message", function incoming(message) {

});


