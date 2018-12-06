var socket = new WebSocket('ws://localhost:3000')
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
var player = null
var myTurn = false
var validOptions = null

$('#boardTable tr td').click(function (event) {
    if (myTurn === true) {
        myTurn = false
        var id = String(event.target.id)
        move(id)
    }
})

function move (loc) {
    removeValidOptions(validOptions)
    var yLoc = letters.indexOf(loc.charAt(0))
    var xLoc = parseInt(loc.charAt(1)) - 1
    if (validOptions[yLoc][xLoc] === 1) {
        var move = { type: 'move', player: player, x: xLoc, y: yLoc }
        socket.send(JSON.stringify(move))
        validOptions = null
    } else {
        myTurn = true
        drawValidOptions(validOptions)
    }
}

function sendName () {
    let nickname = { type: 'nickname', nickname: getCookie(), player: player }
    socket.send(JSON.stringify(nickname))
}

function setValue (value, location) {
    if (value === 1) {
        document.getElementById(location).style.backgroundImage = "url('/images/BlackPiece.png')"
    } else if (value === -1) {
        document.getElementById(location).style.backgroundImage = "url('/images/WhitePiece.png')"
    }
}

function createBoard (boardArr) {
    for (var i = 0; i < boardArr.length; i++) {
        for (var j = 1; j <= boardArr[i].length; j++) {
            setValue(boardArr[i][j - 1], letters[i] + j)
        }
    }
}

function drawValidOptions (validOptions) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var id = letters[i] + (j + 1)
            if (validOptions[i][j] === 1) {
                document.getElementById(id).style.backgroundImage = "url('images/vmove.png')"
            }
        }
    }
}

function removeValidOptions (validOptions) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var id = letters[i] + (j + 1)
            if (validOptions[i][j] === 1) {
                document.getElementById(id).style.backgroundImage = 'none'
            }
        }
    }
}

function showPopup (win) {
    if (win === 1) {
        popup('You won!', '', 'Play Again', '/play')
    } else if (win === -1) {
        popup('You lost!', 'Better luck next time!', 'Play Again', '/play')
    } else if (win === 0) {
        popup('Draw!', '', 'Play Again', '/play')
    }
}

socket.onmessage = function incoming (message) {
    var mesObj = JSON.parse(message.data)
    if (mesObj.type === 'board') {
        document.getElementById('player1score').innerHTML = mesObj.scoreA
        document.getElementById('player2score').innerHTML = mesObj.scoreB
        createBoard(mesObj.board)
    } else if (mesObj.type === 'gameStart') {
        player = mesObj.player
        document.getElementById('player1score').innerHTML = mesObj.scoreA
        document.getElementById('player2score').innerHTML = mesObj.scoreB
        if (player === 'A') {
            document.getElementById('player1type').innerHTML = 'You'
            document.getElementById('player2type').innerHTML = 'Opponent'
        } else if (player === 'B') {
            document.getElementById('player2type').innerHTML = 'You'
            document.getElementById('player1type').innerHTML = 'Opponent'
        }
        sendName()
        createBoard(mesObj.board)
        removeWaitLayover()
    } else if (mesObj.type === 'turn') {
        myTurn = true
        validOptions = mesObj.valid
        drawValidOptions(mesObj.valid)
    } else if (mesObj.type === 'gameEnd') {
        if (mesObj.ending === player) {
            showPopup(1)
        } else if (mesObj.ending === 'draw') {
            showPopup(0)
        } else {
            showPopup(-1)
        }
        stopTimer()
    } else if (mesObj.type === 'nicknames') {
        document.getElementById('player1name').innerHTML = mesObj.nickA
        document.getElementById('player2name').innerHTML = mesObj.nickB
        timer()
    } else if (mesObj.type === 'troll') {
        window.location.replace('http://www.quickmeme.com/img/05/05fc38d8796113573eb04330305abb8c554b02243b39c5e84501806fbf6e9708.jpg')
    }
}

function getCookie () {
    var content = document.cookie
    content = content.replace('name: ', '')
    return content
}
