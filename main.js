const logo = document.querySelector('.logo');
const instruct = document.querySelector('.btn-info');
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
let checkWord = '';

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

function scoreKeys(k, i) {
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

function checkScore(checkLetter) {
	if (attempt[i] == realLetter[i]) {
		currentAttempt.children[i].classList.replace('nah', 'yeah');
		checkLetter.splice(checkWord.search(attempt[i]), 1);
		checkWord = '';
		checkLetter.forEach(a => checkWord = checkWord + a);
	}
	return
}

function score() {
	let checkLetter = [...realLetter];
		checkLetter.forEach(a => checkWord = checkWord + a); 
	for (i=0; i < attempt.length; i++) {
		currentAttempt.children[i].classList.add('nah');
	}
	for (i=0; i < attempt.length; i++) {
		checkScore(checkLetter, attempt);
	};
	for (i=0; i < attempt.length; i++) {
		if (checkWord.search(attempt[i], 0) >= 0) {
			currentAttempt.children[i].classList.replace('nah', 'close');
		}
		keyboard.forEach(k => scoreKeys(k ,i));
	}
	reset();
}

function reset() {
	guess = '';
	checkWord = '';
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
	modalGiveUp.style.display = 'block';

	for (i=0; i<realLetter.length; i++) {
		surrender.children[i].textContent = realLetter[i];
	}
	gameOver = true;
}

function showInstruct() {
	modalHints.style.display = 'block';
}

function hideInstruct() {
	modalHints.style.display = 'none';
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
instruct.addEventListener('click', showInstruct);
closeHints.addEventListener('click', hideInstruct);