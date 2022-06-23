const clueButton = document.querySelector('.btn-clue');
const closeClues = document.querySelector('.btn-close__clues');
const modalClues = document.querySelector('.modal__clues');
const modalCluesList = document.querySelector('.modal__clues-list');

let clueWords = [];
let soFarLetters = [];
let soNotLetters = [];
let clueWordList = [];
let modalClueItems = [];


function getClues() {
	clueWords.length != 0 ? null: clueWords = [...allowedWords].sort();
	keyboard.forEach(key => {
		if (key.classList.contains('nah')) {
			soNotLetters.push(key.textContent);
		} else if (key.classList.contains('close')) {
			soFarLetters.push(key.textContent);
		}
	})
	soNotLetters.forEach(letter => clueWords = clueWords.filter(clue => !clue.includes(letter)));
	soFarLetters.forEach(letter => clueWords = clueWords.filter(clue => clue.includes(letter)));

	for(i = 0; i < attemptNumber; i++) {
		for(g = 0; g < 5; g++) {
			attemptLetter = allAttempts[i].children[g];
			if(attemptLetter.classList.contains('yeah')) {
				clueWords = clueWords.filter(clue => clue.indexOf(attemptLetter.textContent, 0) == g)
			} else if (attemptLetter.classList.contains('close')) {
				clueWords = clueWords.filter(clue => clue.split('')[g] != attemptLetter.textContent)
			}
		}
	}
	displayClues();
}


function getCluesOld() {
	clueWords = [...allowedWords].sort();
	soFarLetters = [];	
	soNotLetters = [];
	keyboard.forEach(key => {
		if (key.classList.contains('yeah')) {
			if ([...realAnswer].filter(l => l === key.dataset.number).length === 1) {
				console.log('it is unique');
				clueWords = clueWords.filter(c => (c.indexOf(key.dataset.number, 0) == realAnswer.indexOf(key.dataset.number, 0)));
			}
		}

		if (key.classList.contains('close') || key.classList.contains('yeah')) {
			soFarLetters.push(key.textContent);
		}
		if (key.classList.contains('nah')) {
			soNotLetters.push(key.textContent);
		}
	})
	soFarLetters.forEach(letter => clueWords = clueWords.filter(clue => clue.includes(letter)));
	soNotLetters.forEach(letter => clueWords = clueWords.filter(clue => !clue.includes(letter)));
	displayClues();
}



function displayClues() {
	modalClueItems = [];
	clueWords.forEach(clue => modalClueItems.push(`<li>${clue}</li>`));
	modalCluesList.innerHTML = modalClueItems.slice(0, 30).join('');
	modalClues.style.display = 'block';
}

function hideClues() {
	modalClues.style.display = 'none';
}

clueButton.addEventListener('click', getClues);
closeClues.addEventListener('click', hideClues);
