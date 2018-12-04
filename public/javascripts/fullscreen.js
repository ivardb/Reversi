var fullScreen = false

function fullscreenHandler () {
    if (fullScreen === true) {
        exitFullScreen()
    } else if (fullScreen === false) {
        setFullScreen()
    }
}

function setFullScreen () {
    var cssLink = document.createElement('link')
    cssLink.id = 'fullScreenStyle'
    cssLink.rel = 'stylesheet'
    cssLink.type = 'text/css'
    cssLink.href = 'stylesheets/fullscreen.css'
    document.head.appendChild(cssLink)

    var fullScreenElement = document.getElementsByTagName('main')[0]
    if (fullScreenElement.webkitRequestFullScreen)fullScreenElement.webkitRequestFullScreen()// for chrome
    else if (fullScreenElement.mozRequestFullscreen)fullScreenElement.mozRequestFullscreen()// for firefox
    else if (fullScreenElement.msRequestFullScreen)fullScreenElement.msRequestFullScreen()// for edge
    else fullScreenElement.requestFullscreen()
    document.getElementById('fullscreenButton').style.backgroundImage = 'url("/images/exitFullScreen.png")'
}

function exitFullScreen () {
    var fullScreenElement = document
    if (fullScreenElement.webkitExitFullscreen)document.webkitExitFullscreen()
    else if (fullScreenElement.mozCancelFullScreen)fullScreenElement.mozCancelFullScreen()
    else if (fullScreenElement.msExitFullscreen)fullScreenElement.msExitFullscreen()
    else fullScreenElement.exitFullScreen()
    fullScreenStyleReset()
}

function fullScreenStyleReset () {
    if (fullScreen === false) {
        document.head.removeChild(document.getElementById('fullScreenStyle'))
        document.getElementById('fullscreenButton').style.backgroundImage = 'url("/images/enterFullScreen.png")'
    }
}

document.addEventListener('fullscreenchange', function () {
    fullScreen = !fullScreen
    fullScreenStyleReset()
})

document.addEventListener('mozfullscreenchange', function () {
    fullScreen = !fullScreen
    fullScreenStyleReset()
})

document.addEventListener('webkitfullscreenchange', function () {
    fullScreen = !fullScreen
    fullScreenStyleReset()
})

document.addEventListener('msfullscreenchange', function () {
    fullScreenStyleReset()
})
