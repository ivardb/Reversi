function setCookie () {
    let nickname = document.getElementById('nickname').value
    if (popupOpen === true) {
        emphasize()
    } else if (nickname === '') {
        popup('Invalid name', 'Please enter a name!', 'OK', '')
    } else if (nickname.length > 10) {
        popup('Invalid name', 'The maximum amount of characters you can use is 10', 'OK', '')
    } else {
        document.cookie = 'name: ' + nickname
        window.location.href = '/play'
    }
}
