var socket = new WebSocket("ws://localhost:3000");
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

$("#boardTable tr td").click(function(event){
    console.log(event.target.id);
    setValue("1", event.target.id);
    var location = event.target.id;
    var yLoc = letters.indexOf(location.charAt(0)) + 1;
    var xLoc = parseInt(location.charAt(1));
    console.log(xLoc + " - " + yLoc);
    var move = {type:"MOVE", x:xLoc, y:yLoc};
    socket.send(JSON.stringify(move));

    
})

function setValue(value, location){
    document.getElementById(location).innerHTML = value; 
}

socket.on("message", function incoming(message) {
    
});

