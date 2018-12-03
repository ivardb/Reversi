function setCookie () {
    let nickname = document.getElementById('nickname').value
    if (nickname === '') {
        console.log('Please enter a nickname!')
    } else if (nickname.length > 10) {
        console.log('The maximum size for a nickname is 10 characters')
    } else {
        document.cookie = 'name: ' + nickname
        window.location.href = '/play'
    }
}