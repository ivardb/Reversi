function generateBoard(){
    var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");
    var board = new Array();
    var container = document.getElementById("board");
    var table = document.createElement("table");
    table.id = "boardTable";
    for(var i=0; i<8; i++){
        var row = document.createElement("tr");
        row.id = "row " + letters[i];
        for(var j=1; j<=8; j++){
            var cell = document.createElement("td");
            var id = "" + letters[i] + j;
            cell.id = id;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);

}
generateBoard();