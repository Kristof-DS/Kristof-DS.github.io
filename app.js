let player = document.querySelector('.player')

const board = document.querySelector('.board')

const cells = document.querySelectorAll('.cell')

const restart = document.querySelector('.restart')

const message = document.querySelector('.message')

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

let playedCells = ['','','','','','','','','']

let counter = 0

checkWinner = () => {
    for (let i = 0; i < winCombinations.length; i++){
        const [a, b, c] = winCombinations[i]
        if (playedCells[a] && playedCells[a] === playedCells[b] && playedCells[a] === playedCells [c]){
            return playedCells[a]
        }
    }
    return null
}

const switchPlayer = () => {
    switch (player.innerText) {
        case('X'):
            player.innerText = 'O'
            break
        case ('O'):
            player.innerText = 'X'
            break
    }
}

const placemarker = (e) => {
    counter++
    e.target.firstChild.innerText = player.innerText
    e.target.removeEventListener("click", placemarker)
    playedCells[e.target.id] = player.innerText
    if (checkWinner()){
        cells.forEach((cell) => cell.removeEventListener ("click", placemarker))
        message.innerText= `${checkWinner()} is the winner!`
        return
    }
    if (counter == 9){
        message.innerText = `It's a tie!`
        return
    }
    switchPlayer()
}

cells.forEach((cell) => cell.addEventListener("click", (placemarker)))

restart.addEventListener("click", () => {
    counter = 0
    cells.forEach((cell) => cell.firstChild.innerText = "")
    message.innerHTML = `Player <span class="player">X</span>'s turn`
    player = document.querySelector('.player')
    cells.forEach((cell) => cell.addEventListener("click", placemarker))
    playedCells = playedCells.map(() => '')
})