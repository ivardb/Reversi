var fullScreen = false

function fullscreenHandler () {
    if (fullScreen) {
        fullScreen = false
        exitFullScreen()
    } else {
        fullScreen = true
        setFullScreen()
    }
}

function setFullScreen () {
    var link = document.createElement('link')
    link.id = 'fullScreenStyle'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'stylesheets/fullscreen.css'
    document.getElementsByTagName('head')[0].appendChild(link)
    var fullScreenElement = document.getElementsByTagName('main')[0]
    if (fullScreenElement.webkitRequestFullScreen)fullScreenElement.webkitRequestFullScreen()// for chrome
    else if (fullScreenElement.mozRequestFullscreen)fullScreenElement.mozRequestFullscreen()// for firefox
    else if (fullScreenElement.msRequestFullScreen)fullScreenElement.msRequestFullScreen()// for edge
    else fullScreenElement.requestFullscreen()
    document.getElementById('fullscreenButton').setAttribute('background-image', 'url("/images/exitFullScreen.png")')
}

function exitFullScreen () {
    var fullScreenElement = document
    document.getElementsByTagName('head')[0].removeChild(document.getElementById('fullScreenStyle'))
    if (fullScreenElement.webkitExitFullscreen)document.webkitExitFullscreen()
    else if (fullScreenElement.mozCancelFullScreen)fullScreenElement.mozCancelFullScreen()
    else if (fullScreenElement.msExitFullscreen)fullScreenElement.msExitFullscreen()
    else fullScreenElement.exitFullScreen()
    document.getElementById('fullscreenButton').setAttribute('background-image', 'url("/images/enterFullScreen.png")')
}
