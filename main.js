const logo = document.querySelector('.logo');
const keyboard = document.querySelectorAll('.keyboard-key');
const attemptA = document.querySelector('.attemptA');
const attemptB = document.querySelector('.attemptB');
const attemptC = document.querySelector('.attemptC');
const attemptD = document.querySelector('.attemptD');
const attemptE = document.querySelector('.attemptE');
const attemptF = document.querySelector('.attemptF');

let gameOver = false;
let allWords = [];
let realAnswer = "";
let realLetter =[];
let attemptNumber = 0;
let allAttempts = [attemptA, attemptB, attemptC, attemptD, attemptE, attemptF]
let currentAttempt = allAttempts[attemptNumber];
let letterInd = 0;
let attempt = [];
let letter;
let guess = '';

function placeLetter(e) {
	if(gameOver) {return};
	letter = e.target.dataset.number;
	if(letter == 'enter' && letterInd == 5 ) {
		score ();
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

function checkGuess(guess) {

	console.log('did not check');
	return true;
}

function scoreKeys(k) {
	if(k.dataset.number == attempt[i]) {
		k.classList.add('nah');
		if(realAnswer.search(attempt[i], 0) >= 0) {
			k.classList.replace('nah', 'close');
		}
	}
} 

function score() {
	attempt.forEach(a => guess = guess + a);
	const validGuess = allWords.findIndex(checkGuess);
	if (checkGuess()) {
		for (i=0; i<5; i++) {
			currentAttempt.children[i].classList.add('nah');
			if (realAnswer.search(attempt[i], 0) >= 0) { 
				currentAttempt.children[i].classList.replace('nah', 'close');
			}
			if (attempt[i] == realLetter[i]) { 
				currentAttempt.children[i].classList.replace('close', 'yeah');
			}
			keyboard.forEach(k => scoreKeys(k));
				
			
		}
		reset();
	}
	return
}

function reset() {
	guess = '';
	attempt = [];
	letterInd = 0;
	attemptNumber ++;
	if(attemptNumber > 5) {gameOver = true};
	currentAttempt = allAttempts[attemptNumber];
	return;	
}


function realAnswerTest(realAnswer) {
	realLetter = realAnswer.split('');
}

function giveUp() {
	const giveUpMessage = `The word was "${realAnswer}".`
	alert(giveUpMessage);
	gameOver = true;
}


// ************************************************************


fetch('words5.json')
	.then (response => response.json())
	.then (loadedWords => {
		allWords = loadedWords;
		wordNumber = Math.floor(Math.random() * allWords.length);
		realAnswer = allWords[wordNumber].word;
		realAnswerTest(realAnswer);
	})



keyboard.forEach(key => key.addEventListener('click', placeLetter));
logo.addEventListener('click', giveUp);