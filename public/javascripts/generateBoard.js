function generateBoard(){
    console.log("start of function");
    var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");
    var board = new Array();
    var container = document.getElementById("board");
    var table = document.createElement(table)
    table.id = "boardTable";
    for(var i=1; i<=8; i++){
        var row = document.createElement("tr");
        row.id = "row " + i;
        for(var j=0; j<8; j++){
            var cell = document.createElement("td");
            var id = "" + i + letters[j];
            cell.id = id;
            cell.class = "boardCell";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);

}
generateBoard();