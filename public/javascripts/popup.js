var popuphref
var popupOpen

function popup (headtext, messagetext, buttontext, buttonhref) {
    popupOpen = true
    popuphref = buttonhref
    let popup = document.createElement('div')
    popup.id = 'popup'
    let header = document.createElement('h3')
    let message = document.createElement('p')
    let button = document.createElement('div')
    button.innerHTML = buttontext
    message.innerHTML = messagetext
    header.innerHTML = headtext
    header.id = 'popupheader'
    button.setAttribute('onclick', 'closePopup()')
    popup.appendChild(header)
    popup.appendChild(message)
    popup.appendChild(button)
    document.getElementsByTagName('body')[0].appendChild(popup)
}

function closePopup () {
    popupOpen = false
    if (popuphref === '') {
        let popup = document.getElementById('popup')
        popup.parentNode.removeChild(popup)
    } else {
        window.location = popuphref
    }
}

function emphasize () {
    if (popupOpen === true) {
        setColor()
        window.setTimeout(resetColor, 200)
    }
}

function setColor () {
    document.getElementById('popupheader').style.backgroundColor = 'red'
}

function resetColor () {
    document.getElementById('popupheader').style.backgroundColor = '#443F35'
}