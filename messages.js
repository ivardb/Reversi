function gameStart (player, board, scoreA, scoreB) {
    var ret = {}
    ret.type = 'gameStart'
    ret.player = player
    ret.board = board
    ret.scoreA = scoreA
    ret.scoreB = scoreB
    return ret
}

function turn (validMoves) {
    var ret = {}
    ret.type = 'turn'
    ret.valid = validMoves
    return ret
}

function board (board, scoreA, scoreB) {
    var ret = {}
    ret.type = 'board'
    ret.board = board
    ret.scoreA = scoreA
    ret.scoreB = scoreB
    return ret
}

function gameEnd (ending, scoreA, scoreB) {
    var ret = {}
    ret.type = 'gameEnd'
    ret.ending = ending
    ret.scoreA = scoreA
    ret.scoreB = scoreB
    return ret
}

exports.gameStart = gameStart
exports.turn = turn
exports.board = board
exports.gameEnd = gameEnd
