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
        window.alert('Not a valid option!')
        myTurn = true
        drawValidOptions(validOptions)
    }
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

function popup (win) {
    let popup = document.createElement('div')
    popup.id = 'popup'
    let header = document.createElement('p')
    let visual = document.createElement('div')
    let button = document.createElement('a')
    button.innerHTML = 'Play again!'
    button.href = '/'
    if (win === 1) {
        visual.id = 'win'
        header.innerHTML = 'You won!'
    } else if (win === -1) {
        visual.id = 'loss'
        header.innerHTML = 'You lost!'
    } else if (win === 0) {
        visual.id = 'draw'
        header.innerHTML = 'Draw!'
    }
    popup.appendChild(header)
    popup.appendChild(visual)
    popup.appendChild(button)
    document.getElementsByTagName('main')[0].appendChild(popup)
}

socket.onmessage = function incoming (message) {
    var mesObj = JSON.parse(message.data)
    if (mesObj.type === 'board') {
        document.getElementById('player1score').innerHTML = mesObj.scoreA
        document.getElementById('player2score').innerHTML = mesObj.scoreB
        createBoard(mesObj.board)
    } else if (mesObj.type === 'gameStart') {
        player = mesObj.player
        createBoard(mesObj.board)
        document.getElementById('player1score').innerHTML = mesObj.scoreA
        document.getElementById('player2score').innerHTML = mesObj.scoreB
        if (player === 'A') {
            document.getElementById('player1type').innerHTML = 'You'
            document.getElementById('player2type').innerHTML = 'Opponent'
        } else if (player === 'B') {
            document.getElementById('player2type').innerHTML = 'You'
            document.getElementById('player1type').innerHTML = 'Opponent'
        }
        timer()
        for (let i = 0; i < validOptions.length; i++) {
            for (let j = 1; j <= validOptions.length; j++) {
                let id = letters[i] + j
                if (validOptions[j - 1][i] === 1) {
                    document.getElementById(id).style.backgroundImage = 'none'
                }
            }
        }
    } else if (mesObj.type === 'turn') {
        myTurn = true
        console.log(myTurn)
        validOptions = mesObj.valid
        drawValidOptions(mesObj.valid)
    } else if (mesObj.type === 'gameEnd') {
        if (mesObj.ending === player) {
            window.alert('You won!')
        } else if (mesObj.ending === 'draw') {
            window.alert('Draw!')
        } else {
            window.alert('You lost!')
        }
    }
}
