const logo = document.querySelector('.logo');
const instruct = document.querySelector('.btn-info');
const modalAlert = document.querySelector('.modal__alert');
const modalGiveUp = document.querySelector('.modal__giveup');
const modalHints = document.querySelector('.modal__hints');
const closeGiveUp = document.querySelector('.btn-close__giveup');
const closeHints = document.querySelector('.btn-close__hints');
const keyboard = document.querySelectorAll('.keyboard-key');
const attemptA = document.querySelector('.attemptA');
const attemptB = document.querySelector('.attemptB');
const attemptC = document.querySelector('.attemptC');
const attemptD = document.querySelector('.attemptD');
const attemptE = document.querySelector('.attemptE');
const attemptF = document.querySelector('.attemptF');
const surrender = document.querySelector('.surrender');
const modalGameOver = document.querySelector('.modal__gameover');
const playAgainButton = document.querySelector('.again');
const shareButton = document.querySelector('.share');
const sharePatch = document.querySelector('.share__patch')
const wordleNumber = todaysWordle();
const wordNumber = todaysWord();


let gameOver = false;
let allWords = [];
let realAnswer = "";
let realLetter =[];
let attemptNumber = 0;
const winMessage = ['Impossible', 'Genius', 'Outstanding', 'Well done', 'Congrats', 'Only just', 'Too many'];
let allAttempts = [attemptA, attemptB, attemptC, attemptD, attemptE, attemptF]
let currentAttempt = allAttempts[attemptNumber];
let letterInd = 0;
let attempt = [];
let letter;
let guess = '';
let checkWord = '';
let isValid;
let idx = 1;
let socialLetter = []; 
let socialDisplay = []; 


function modalNote(message) {
	modalAlert.textContent = message;
	modalAlert.classList.add('modal__notice');
}

function placeLetter(e) {
	if(gameOver) {return};
	letter = e.target.dataset.number;
	if(letter == 'enter' && letterInd == 5 ) {
		checkGuess(attempt);
	} else {
		if(letter == 'bspace' && letterInd > 0 ) {
			letterInd --;
			currentAttempt.children[letterInd].textContent = '';
			attempt.splice(letterInd, 1);
		} else { 
			if (letterInd > 4) {
				return;
			} else {
				if(letter == 'enter' || letter == 'bspace') {
					return;
				} else {
					currentAttempt.children[letterInd].textContent = letter;
					attempt.push(letter); 
					letterInd ++; 
				}
			}
		}
	}
}

function flipIt() {
	idx = 0;
	dancers = Array.from(currentAttempt.children);
	dancers.forEach(dancer => {
		dancer.classList.add('tile_flip');
		idx++;
		setTimeout(() => {
			dancer.classList.remove('tile_flip');
		}, idx * 200 + 200);
	})	
}

function shakeIt() {
	currentAttempt.classList.add('invalid');
	setTimeout(() => {currentAttempt.classList.remove('invalid')}, 800);
	guess = '';
}


function danceIt() {
	idx = 0;
	dancers = Array.from(currentAttempt.children);
	dancers.forEach(dancer => {
		dancer.classList.add('solved');
		idx++;
		setTimeout(() => {
			dancer.classList.remove('solved');
		}, idx * 300);
	})
}

function checkGuess(attempt) {
	attempt.forEach(a => guess = guess + a);
	isValid = allowedWords.includes(guess);
	if (!isValid) {
		shakeIt();
	} else {
		score();
	}
}

function scoreKeys(k) {
	for (i=0; i<5; i++) {
		if(k.dataset.number == attempt[i]) {
			k.classList.add('nah');
			if(realAnswer.search(attempt[i], 0) >= 0) {
				k.classList.replace('nah', 'close');
				if (attempt[i] == realLetter[i]) {
					k.classList.replace('close', 'yeah');
				}
			}
		}
	}
} 

function score () {
	let checkLetter = [...realLetter];
	// let checkAttempt = [...attempt];
	checkLetter.forEach(a => checkWord = checkWord + a);

	for (i = 0; i < attempt.length; i++) {
		currentAttempt.children[i].classList.add('nah');
		flipIt();
	}

	for (i = attempt.length-1; i>=0; i--) {
		if (attempt[i] == realLetter[i]) {
			currentAttempt.children[i].classList.replace('nah', 'yeah');
			checkLetter.splice(checkWord.search(attempt[i]), 1);
			checkWord = '';
			checkLetter.forEach(a => checkWord = checkWord + a);
		}
	}

	for (i = 0; i < attempt.length; i++) {
		if (!currentAttempt.children[i].classList.contains('yeah')) {
		
			if (checkWord.search(attempt[i], 0) >= 0) {
				currentAttempt.children[i].classList.replace('nah', 'close');
				checkLetter.splice(checkWord.search(attempt[i]), 1);
				checkWord = '';
				checkLetter.forEach(a => checkWord = checkWord + a);
			}
		}
	}
	keyboard.forEach(k => scoreKeys(k));
	reset();
}

function reset() {
	if (guess == realAnswer) {
		danceIt();
		gameOver = true;
		message = winMessage[attemptNumber];
		modalNote(message);
		modalGameOver.style.display = 'grid';
		keyboard.forEach(key => key.removeEventListener('click', placeLetter));

	} else {
		guess = '';
		checkWord = '';
		attempt = [];
		letterInd = 0;
		attemptNumber ++;
		if(attemptNumber > 5) {gameOver = true};
		currentAttempt = allAttempts[attemptNumber];
	}
}

function giveUp() {
	modalGiveUp.style.display = 'grid';

	for (i=0; i<realLetter.length; i++) {
		surrender.children[i].textContent = realLetter[i];
	}
	modalGameOver.style.display = 'grid';
	gameOver = true;
}

function showInstruct() {
	modalHints.style.display = 'block';
}

function hideInstruct() {
	modalHints.style.display = 'none';
}

function play() {
	location.reload()
}

function socialShare() {
	resultGrid = `Giraffle ${wordNumber} ${attemptNumber + 1}/6 \n`;
	for (a = 0; a < (attemptNumber+1); a++) {
		for (i = 0; i < 5; i++) {
			if (allAttempts[a].children[i].classList.contains('yeah')) {
				socialLetter[i] = '🟩';
			} else {
				if (allAttempts[a].children[i].classList.contains('close')) {
					socialLetter[i] = '🟨';
				} else {
					socialLetter[i] = '⬜';
				}
			}
		}
		socialDisplay[a] = '';
		socialLetter.forEach((letter) => socialDisplay[a] = socialDisplay[a] + letter);
		resultGrid = resultGrid + '\n' + socialDisplay[a];
	}

	let sharePatchContent = resultGrid;
	navigator.clipboard.writeText(sharePatchContent);
	modalNote('copied');

}

function todaysWord() {
	const lastWordleNumber = localStorage.wordle || '0';
	localStorage.setItem('wordle', wordleNumber);
	const wordNumber = (lastWordleNumber == wordleNumber)? Math.floor(Math.random() * 2315): wordleNumber;
	return wordNumber;
}

function todaysWordle() {
	const today = new Date();
	const wordleStartDate = new Date('2021, 6, 19');
	const wordleNumber = Math.floor(((today.valueOf() - wordleStartDate.valueOf())/1000/60/60/24));
	return wordleNumber;
}

// ************************************************************


function getTargetWords() {
	fetch('targetWords.json', {credentials: 'same-origin'})
	.then (response => response.json())
	.then (data => {
		allWords = data
		realAnswer = allWords[wordNumber]
		realLetter = realAnswer.split("")
	})
	.catch (err => {
		console.log(err)
		alert('Something is rotten. I am trying to fix it')
	})
}

function getAllowedWords() {
	fetch('dictionary.json', {credentials: 'same-origin'})
	.then (response => response.json())
	.then (data => allowedWords = data)
}


getAllowedWords();
getTargetWords();


keyboard.forEach(key => key.addEventListener('click', placeLetter));
logo.addEventListener('click', giveUp);
modalAlert.addEventListener('transitionend', () => modalAlert.classList.remove('modal__notice'));
instruct.addEventListener('click', showInstruct);
closeHints.addEventListener('click', hideInstruct);
playAgainButton.addEventListener('click', play);
shareButton.addEventListener('click', socialShare);