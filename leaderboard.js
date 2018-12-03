var leaderboard = new Array(10)

function addScore (nickname, score) {
    console.log(nickname + ': ' + score)
    for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i] === undefined || score > leaderboard[i].score) {
            add(nickname, score, i)
            break
        }
    }
    console.log(leaderboard)
}

function add (nickname, score, position) {
    console.log((position + 1) + ': ' + nickname + ', ' + score)
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

module.exports.add = addScore
module.exports.leaderboard = leaderboard
