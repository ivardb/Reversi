var express = require('express')
var http = require('http')
var WebSocket = require('ws')
var port = process.argv[2]
var app = express()
var Game = require('./game')
var messages = require('./messages')
var path = require('path')
var stats = require('./statTracker')
var leaderBoard = require('./leaderboard')

var indexRouter = require('./routes/index')

app.use(express.static(path.join(__dirname, '/public')))

app.get('/play', indexRouter)
app.get('/', indexRouter)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

var server = http.createServer(app)

const wss = new WebSocket.Server({ server })
var currentGame = new Game(stats.gamesInitialized++)

var websockets = {} // property websocket, value: game
var connectionID = 0

// clean up the websockets
setInterval(function () {
    for (let i in websockets) {
        if (websockets.hasOwnProperty(i)) {
            let gameObj = websockets[i]
            if (gameObj.finalStatus === true) {
                console.log('\tDeleting element ' + i)
                delete websockets[i]
            }
        }
    }
}, 50000)

wss.on('connection', function (ws) {
    console.log('Connection established')
    let con = ws
    con.id = connectionID++
    let player
    if (currentGame.generalState === '0 players' || currentGame.generalState === '1 player') {
        player = currentGame.addPlayer(con)
        websockets[con.id] = currentGame
    } else {
        currentGame = new Game(stats.gamesInitialized++)
        websockets[con.id] = currentGame
        player = currentGame.addPlayer(con)
    }
    var gameStartObj = messages.gameStart(player, websockets[con.id].board.boardArray)
    if (gameStartObj.player === 'B') {
        websockets[con.id].playerA.send(JSON.stringify(messages.gameStart('A', websockets[con.id].board.boardArray, websockets[con.id].gameState.scorePlayerA, websockets[con.id].gameState.scorePlayerB)))
        websockets[con.id].playerB.send(JSON.stringify(messages.gameStart('B', websockets[con.id].board.boardArray, websockets[con.id].gameState.scorePlayerA, websockets[con.id].gameState.scorePlayerB)))
        con.send(JSON.stringify(messages.turn(websockets[con.id].gameState.validMovesBlack)))
    }

    ws.on('message', function incoming (message) {
        if (websockets[con.id] !== undefined) {
            console.log('[LOG:' + websockets[con.id].id + '] ' + message)
            let gameObj = websockets[con.id]
            let mesObj
            try {
                mesObj = JSON.parse(message)
                let playerType = mesObj.player
                var color
                if (playerType === 'A') {
                    color = -1
                } else {
                    color = 1
                }
                if (mesObj.type === 'move') {
                    if (gameObj.generalState === '2 players') {
                        if (playerType === 'A') {
                            gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y)
                            gameObj.gameState.calculateScore(gameObj.board)
                            gameObj.gameState.clear()
                            gameObj.updateValidMoves(gameObj.board, color)
                            gameObj.updateValidMoves(gameObj.board, color * -1)
                            gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)))
                            gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)))
                            if (gameObj.gameState.canMove(color * -1)) {
                                gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)))
                                console.log('Player B turn')
                            } else if (gameObj.gameState.canMove(color)) {
                                gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)))
                                console.log('Player A turn')
                            } else {
                                endGame(gameObj)
                            }
                        } else {
                            gameObj.capture(gameObj.board, color, mesObj.x, mesObj.y)
                            gameObj.gameState.calculateScore(gameObj.board)
                            gameObj.gameState.clear()
                            gameObj.updateValidMoves(gameObj.board, color)
                            gameObj.updateValidMoves(gameObj.board, color * -1)
                            gameObj.playerA.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)))
                            gameObj.playerB.send(JSON.stringify(messages.board(gameObj.board.boardArray, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)))
                            if (gameObj.gameState.canMove(color * -1)) {
                                gameObj.playerA.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesWhite)))
                                console.log('Player A turn')
                            } else if (gameObj.gameState.canMove(color)) {
                                gameObj.playerB.send(JSON.stringify(messages.turn(gameObj.gameState.validMovesBlack)))
                                console.log('Player B turn')
                            } else {
                                endGame(gameObj)
                            }
                        }
                    }
                }
                if (mesObj.type === 'concede') {        // WIP
                    if (ws === gameObj.playerA) {
                        endGame(gameObj, 'B')
                        gameObj.setStatus('B')
                    } else if (ws === gameObj.playerB) {
                        endGame(gameObj, 'A')
                        gameObj.setStatus('A')
                    }
                }
                if (mesObj.type === 'nickname') {
                    if (mesObj.player === 'A') {
                        gameObj.nickNameA = mesObj.nickname
                        if (gameObj.nickNameB !== null) {
                            gameObj.playerA.send(JSON.stringify(messages.nickNames(gameObj.nickNameA, gameObj.nickNameB)))
                            gameObj.playerB.send(JSON.stringify(messages.nickNames(gameObj.nickNameA, gameObj.nickNameB)))
                        }
                    } else if (mesObj.player === 'B') {
                        gameObj.nickNameB = mesObj.nickname
                        if (gameObj.nickNameA !== null) {
                            gameObj.playerA.send(JSON.stringify(messages.nickNames(gameObj.nickNameA, gameObj.nickNameB)))
                            gameObj.playerB.send(JSON.stringify(messages.nickNames(gameObj.nickNameA, gameObj.nickNameB)))
                        }
                    }
                }
            } catch (e) {
                console.log('[LOG] invalid message: ' + message)
                var trollMess = {}
                trollMess.type = 'troll'
                ws.send(JSON.stringify(trollMess))
            }
        }
    })
    ws.on('close', function () {
        console.log('closing')
        let gameObj = websockets[con.id]
        if (websockets[con.id] !== undefined && !gameObj.finalStatus) {
            if (gameObj.playerA === ws) {
                if (gameObj.playerB != null) {
                    gameObj.setStatus('B')
                    stats.blackVictories++
                    var gameEndMessage = messages.gameEnd('B', gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)
                    gameObj.playerB.send(JSON.stringify(gameEndMessage))
                } else {
                    gameObj.setStatus('Aborted')
                }
            } else {
                if (gameObj.playerA != null) {
                    gameObj.setStatus('A')
                    stats.whiteVictories++
                    var gameEndMessage = messages.gameEnd('A', gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)
                    gameObj.playerA.send(JSON.stringify(gameEndMessage))
                } else {
                    gameObj.setStatus('Aborted')
                }
            }
        }
    })
})

function endGame (gameObj) {
    let winner = 'draw'
    if (gameObj.gameState.scorePlayerA > gameObj.gameState.scorePlayerB) {
        winner = 'A'
        stats.whiteVictories++
        gameObj.setStatus('A')
        leaderBoard.add(gameObj.nickNameA, gameObj.gameState.scorePlayerA)
    } else if (gameObj.gameState.scorePlayerB > gameObj.gameState.scorePlayerA) {
        winner = 'B'
        stats.blackVictories++
        gameObj.setStatus('B')
        leaderBoard.add(gameObj.nickNameB, gameObj.gameState.scorePlayerB)
    }
    if (arguments[1] !== undefined) {
        winner = arguments[1]
    }
    var gameEndMessage = messages.gameEnd(winner, gameObj.gameState.scorePlayerA, gameObj.gameState.scorePlayerB)
    gameObj.playerA.send(JSON.stringify(gameEndMessage))
    gameObj.playerB.send(JSON.stringify(gameEndMessage))
    console.log(winner + ' has won.')
}

server.listen(port)
