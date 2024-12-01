

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

/**
* Attempts to parse a string into a json object.
* @param {string} jsonstring
* @return {object | boolean} Returns false if the string could not be parsed.
*/
function tryParseJson (jsonstring)
{
	try
	{
		return JSON.parse(jsonstring);
	}
	catch (ex)
	{
		return false;
	}
}

/**
* Fetch and loads the game's resources into memory.
* @param {string} path
* @return {object | string}
* @async
*/
async function httpFetch (path)
{
	let response = await fetch(path);

	try
	{
		return await response.json();
	}
	catch(ex)
	{
		return await response.text();
	}
}

export {
	getCanvas,
	mouseToCanvasCoordenates,
	tryParseJson,
	httpFetch
}
