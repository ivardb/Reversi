var runTimer = true

function timer () {
    var startTime = Date.now()
    setInterval(function () {
        if (runTimer) {
            var timeElapsed = Date.now() - startTime
            var seconds = Math.floor(timeElapsed / 1000)
            var minutes = Math.floor(seconds / 60)
            seconds -= minutes * 60
            var hours = Math.floor(minutes / 60)
            minutes -= hours * 60
            var strSeconds = seconds
            var strMinutes = minutes
            var strHours = hours
            if (seconds < 10)strSeconds = '0' + strSeconds
            if (minutes < 10)strMinutes = '0' + strMinutes
            if (hours < 10)strHours = '0' + strHours
            document.getElementById('clock').innerHTML = strHours + ':' + strMinutes + ':' + strSeconds
        }
    }, 100)
}

function stopTimer () {
    runTimer = false
}