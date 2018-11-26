function generateBoard(height, width){
    console.log("start of function");
    var letters = new Array(A, B, C, D, E, F, G, H);
    var board = new Array();
    var container = document.getElementById("board");
    var table = document.createElement(table)
    for(var i=0; i<8; i++){
        var row = document.createElement(tr);
        row.id = "row " + i;
        for(var j=0; j<8; j++){
            var cell = document.createElement(td);
            var id = "" + i + letters[j];
            cell.id = id;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);

}