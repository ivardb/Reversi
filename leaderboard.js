var leaderboard = new Array(10)

function addScore (nickname, score) {
    for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i] === undefined || score > leaderboard[i].score) {
            add(nickname, score, i)
            break
        }
    }
    console.log(leaderboard)
}

function add (nickname, score, position) {
    let scoreObj = {}
    scoreObj.name = nickname
    scoreObj.score = score
    if (position === 9) {
        leaderboard[position] = scoreObj
    } else {
        for (let i = 8; i >= position; i--) {
            leaderboard[i + 1] = leaderboard[i]
        }
        leaderboard[position] = scoreObj
    }
}

function parseBoard () {
    var res = Array(10)
    for (let i = 0; i < 10; i++) {
        if (leaderboard[i] === undefined) {
            res[i] = { 'name': '-', 'score': '-' }
        } else {
            res[i] = { 'name': leaderboard[i].name, 'score': leaderboard[i].score }
        }
    }
    return res
}

module.exports.add = addScore
module.exports.leaderboard = leaderboard
module.exports.returnParsed = parseBoard
