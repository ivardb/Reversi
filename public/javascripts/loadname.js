function loadName () {
    console.log('loadName started')
    let cookiecontent = getCookie()
    document.getElementById('nickname').setAttribute('value', cookiecontent)

}

function getCookie () {
    var content = document.cookie
    console.log(content)
    content = content.replace('name: ', '')
    console.log(content)
    return content
}