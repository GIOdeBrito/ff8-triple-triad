

function mouseToCanvasCoordenates (mouseX, mouseY)
{
	let canvas = getCanvas();
	let rect = canvas.getBoundingClientRect();

	const obj = {
		X: mouseX - rect.left,
		Y: mouseY - rect.top
	};

	return obj;
}

function getCanvas ()
{
	return window['board'] ?? null;
}
