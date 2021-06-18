const canvasContainer = document.querySelector('#canvas');
const changeCanvasSizeBtn = document.querySelector('#changeCanvasSize');
const switchColorBtn = document.querySelector('#switchColor');
const clearCanvasBtn = document.querySelector('#clearCanvas');

let rainbow = false; // if true, the canvas is painted with rgb colors
let currSize = 16; // tracks the current size of the canvas. used for clearing the board
let canvasSize; // hold the size of the canvas

// called to initialize game
function initialize() {
	setCanvas(currSize);
	addEventListeners();
}

// adds all the squares in and sets the canvas width and height
function setCanvas(sideLength) {
	fillCanvas(sideLength);
	sizeCanvas();
}

// fill canvas with divs
function fillCanvas(sideLength) {
	for(let i = 0; i < sideLength ** 2; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
	
		square.addEventListener('mouseover', (e) => {
			changeSquareColor(e.target)
		})
	
		canvasContainer.appendChild(square);
	}
}

// size the canvas and its items
function sizeCanvas() {
	canvasSize = getCanvasSize();

	canvasContainer.style.cssText = `width: ${canvasSize}px; height: ${canvasSize}px;`;
	canvasContainer.style.setProperty('--cols', Math.ceil(Math.sqrt(canvasContainer.children.length)));
}

// gets canvas size and checks if it is too large
function getCanvasSize() {
	let canvasSize;
		
	if(innerWidth > innerHeight) {
		canvasSize = innerHeight / 2;
	}else {
		canvasSize = innerWidth / 2;
	}
		
	return canvasSize;
}

// returns a random number from min to max
function randInt(min, max)  {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// changes square color when hovered
function changeSquareColor(square) {
	// if rainbow === true, then do rainbow colors
	if(rainbow) {
		if(square.classList.contains('hovered')) {
			if(square.style.opacity >= .1) {
				square.style.opacity = square.style.opacity - .1;
			}
		}else {
			// get random number from 1 to 255 for rgb()
			const r = randInt(1, 255);
			const g = randInt(1, 255);
			const b = randInt(1, 255);
		
			square.style.cssText += `background-color: rgb(${r}, ${g}, ${b}); opacity: 1;`;
			square.classList.remove('black');
			square.classList.add('hovered');
		}
	} // else, use black and white
	else {
		square.classList.remove('hovered');
		square.classList.toggle('black');
		square.style['background-color'] = '#efefef';
	}
}

// resets canvas to original, no children state
function removeCanvas() {
	canvasContainer.style = '';
	while(canvasContainer.firstChild) {
		canvasContainer.removeChild(canvasContainer.lastChild);
	}
}

// toggles rainbow value and changes switchColorBtn text
function switchColor() {
	rainbow = !rainbow;
	switchColorBtn.textContent = `Rainbow paintbrush : ${capitalizeFirstLetter(rainbow.toString())}`
}

function capitalizeFirstLetter(str) {
	const result = str.charAt(0).toUpperCase() + str.slice(1);
	return result;
}

// prompts user for new size of canvas
function askForNumOfSides() {
	let newSize = prompt('Enter the number of squares you want for each side', currSize)

	if(newSize === null) return; // if null, then user has canceled prompt
	if(isNaN(+newSize)) return alert('Invalid input: Must be a number!');
	if(+newSize > 100) newSize = 100;
	if(+newSize < 1) newSize = 1;

	currSize = newSize;

	removeCanvas();
	setCanvas(newSize);
}

// clears canvas by destroying and remaking canvas
function clearCanvas() {
	removeCanvas();
	setCanvas(currSize);
}

// adds the required event listeners
function addEventListeners() {
	changeCanvasSizeBtn.addEventListener('click', askForNumOfSides);
	switchColorBtn.addEventListener('click', switchColor);
	clearCanvasBtn.addEventListener('click', clearCanvas);

	window.addEventListener('resize', sizeCanvas)
}

initialize();
