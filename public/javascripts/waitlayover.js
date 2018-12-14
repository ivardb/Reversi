function startWait () {
    screenRatioCheck()
    if (player === null) {
        let layover = document.createElement('div')
        layover.id = 'waitLayover'
        let animationContainer = document.createElement('div')
        animationContainer.id = 'animcontainer'
        let blockA = document.createElement('div')
        blockA.id = 'blockA'
        blockA.class = 'block'
        let blockB = document.createElement('div')
        blockB.id = 'blockB'
        blockB.class = 'block'
        let blockC = document.createElement('div')
        blockC.id = 'blockC'
        blockC.class = 'block'
        let blockD = document.createElement('div')
        blockD.id = 'blockD'
        blockD.class = 'block'

        let waitText = document.createElement('p')
        waitText.id = 'waittext'
        waitText.innerHTML = 'Waiting for other player'

        animationContainer.appendChild(blockA)
        animationContainer.appendChild(blockB)
        animationContainer.appendChild(blockC)
        animationContainer.appendChild(blockD)
        layover.appendChild(animationContainer)
        layover.appendChild(waitText)
        document.getElementsByTagName('body')[0].appendChild(layover)
    }
}

function removeWaitLayover () {
    document.getElementById('waitLayover').remove()
}

function screenRatioCheck () {
    if ((window.innerWidth / window.innerHeight) > 3.5) {
        console.log('too wide')
        popup('Warning!', 'The game might not display properly due to your screen ratio. Try to resize your window or rotate your device.', 'OK', '')
    } else if ((window.innerWidth / window.innerHeight) < 0.95) {
        console.log('to low')
        popup('Warning!', 'The game might not display properly due to your screen ratio. Try to resize your window or rotate your device.', 'OK', '')
    }
}
