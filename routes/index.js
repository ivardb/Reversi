var express = require('express')
var router = express.Router()
var leaderboard = require('./../leaderboard')
var stats = require('./../statTracker')

/* GET home page. */
router.get('/play', function (req, res) {
    res.sendFile('game.html', { root: './public' })
})

/* Pressing the 'PLAY' button, returns this page */
router.get('/', function (req, res) {
    var board = leaderboard.returnParsed()
    res.render('splash.ejs', {
        initializedGames: stats.gamesInitialized,
        blackWins: stats.blackVictories,
        whiteWins: stats.whiteVictories,
        lb1n: board[0].name,
        lb1s: board[0].score,
        lb2n: board[1].name,
        lb2s: board[1].score,
        lb3n: board[2].name,
        lb3s: board[2].score,
        lb4n: board[3].name,
        lb4s: board[3].score,
        lb5n: board[4].name,
        lb5s: board[4].score,
        lb6n: board[5].name,
        lb6s: board[5].score,
        lb7n: board[6].name,
        lb7s: board[6].score,
        lb8n: board[7].name,
        lb8s: board[7].score,
        lb9n: board[8].name,
        lb9s: board[8].score,
        lb10n: board[9].name,
        lb10s: board[9].score
    })
})

module.exports = router
