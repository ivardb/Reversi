function gameStart(player, board) {
    var ret = {};
    ret.type = "gameStart";
    ret.player = player;
    ret.board = board;
    return ret;
}

function turn(validMoves) {
    var ret = {};
    ret.type = "turn";
    ret.valid = validMoves;
    return ret;
}

exports.gameStart = gameStart;
exports.turn = turn;