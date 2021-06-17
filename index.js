const canvasContainer = document.querySelector('#canvas');
const changeCanvasSizeBtn = document.querySelector('#changeCanvasSize');
const switchColorBtn = document.querySelector('#switchColor');

let rainbow = false;

function initialize() {
	setCanvas(15);
	addEventListeners();
}

function setCanvas(sideLength) {
	let canvasSize = getCanvasSize(sideLength);

	canvasContainer.style.cssText = `width: ${canvasSize}px; height: ${canvasSize}px;`;

	for(let i = 0; i < sideLength ** 2; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
		square.style.cssText = `width: ${canvasSize / sideLength}px;`;
	
		square.addEventListener('mouseover', (e) => {
			changeSquareColor(e.target)
		})
	
		canvasContainer.appendChild(square);
	}
}

function getCanvasSize(sideLength) {
	let canvasSize = sideLength ** 2;

	if(canvasSize > (window.innerWidth / 2)) {
		canvasSize = window.innerWidth / 2;
	}

	if(canvasSize < (window.innerWidth / 4)) {
		canvasSize = window.innerWidth / 4;
	}
	
	return canvasSize;
}

function randInt(min, max)  {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeSquareColor(square) {
	if(rainbow) {
		if(square.classList.contains('hovered')) {
			if(square.style.opacity >= .1) {
				square.style.opacity = square.style.opacity - .1;
			}
		}else {
			const r = randInt(1, 255);
			const g = randInt(1, 255);
			const b = randInt(1, 255);
		
			square.style.cssText += `background-color: rgb(${r}, ${g}, ${b}); opacity: 1;`;
			square.classList.remove('black');
			square.classList.add('hovered');
		}
	}else {
		square.classList.remove('hovered');
		square.classList.toggle('black');
		square.style['background-color'] = 'none';
	}
}

function removeCanvas() {
	canvasContainer.style = '';
	while (canvasContainer.firstChild) {
		canvasContainer.removeChild(canvasContainer.lastChild);
	}
}

function addEventListeners() {
	changeCanvasSizeBtn.addEventListener('click', () => {
		let newSize = +prompt('Enter a new size for the canvas', 16)

		if(isNaN(newSize)) return alert('Invalid input: Must be a number!');
		if(newSize > 100) newSize = 100;
		if(newSize < 1) newSize = 1;

		removeCanvas();
		setCanvas(newSize);
	});

	switchColorBtn.addEventListener('click', () => {
		rainbow = !rainbow;
		switchColorBtn.textContent = `Rainbow paintbrush : ${rainbow}`
	})
}

initialize();
