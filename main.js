// Defining the constants 
// X_Class is the x's
//Circle_class is circles
//Winning combinations is all the combinations
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]

]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')

const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
startGame()

restartButton.addEventListener('click', startGame)

// the functions that will make the game actually run
//Startgame is going to start the game and call the hover class while also clearing the board from the previous game
//handleClick will place either and X or O in each cell depending on who's turn it is, this also calls the swapTurn and setBoardHoverClass
//endGame will determine if the game is a draw or if X wins or if O wins through an if else loop and will display a winningMessage for whoever wins
//swapTurns will obviously swapTurns
//setBoardHoverClass is going to show the X or O for whoevers turn it is to show what cell the cursor is in
//checkWin will check to see if there is a winner against the rules of winningCombinations
function startGame() {
	circleTurn = false
	cellElements.forEach( cell => {
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCLE_CLASS)
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, {once: true})
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleClick(e) {
	const cell = e.target
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	placeMark(cell, currentClass)
	//check for win
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
	swapTurns()
	setBoardHoverClass()
	}
}
	
function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'DRAW!'
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} WINS!`
	}
	winningMessageElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	circleTurn = !circleTurn
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS)
	} else {
		board.classList.add(X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
} 