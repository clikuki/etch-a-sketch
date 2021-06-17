const canvasContainer = document.querySelector('#canvas');

function createCanvas(sideLength) {
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

function changeSquareColor(square) {
	square.classList.toggle('hovered')
}

function removeCanvas() {
	canvasContainer.style = '';
	while (canvasContainer.firstChild) {
		canvasContainer.removeChild(canvasContainer.lastChild);
	}
}

createCanvas(15);