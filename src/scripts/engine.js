const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life")
    },
    values:{
        timerId: null,
        gameVelo: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLife: 3,
    },
    actions:{
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playerLife(){
    state.values.currentLife--
    state.view.life.textContent = state.values.currentLife

    if (state.values.currentLife <= 0){
        clearInterval(state.actions.countDownTimerId); 
        clearInterval(state.values.timerId); 
        alert(`Game Over! Você perdeu todas as vidas. Seu resultado foi: ${state.values.result}`)
    }
}


function playSound(audioName){
    let audio = new Audio(`src/audios/${audioName}.m4a`)
    audio.volume = 0.1
    audio.play()
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(moveEnemy())
        alert(`Game Over! O seu resultado foi: ${state.values.result}`)
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelo)
}

function addListenerHitBox() {
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
            else{
                playerLife()
            }
        })
    })
}

function init() {
    moveEnemy()
    addListenerHitBox()
}


init()