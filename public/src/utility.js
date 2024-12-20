
import Canvas from "./managers/canvas.js";

function mouseToCanvasCoordenates (mouseX, mouseY)
{
	let canvas = Canvas.getCanvas();
	let rect = canvas.getBoundingClientRect();

	const obj = {
		X: mouseX - rect.left,
		Y: mouseY - rect.top
	};

	return obj;
}

/**
* Gets the value of a CSS root variable.
* @param {string} varname
* @return {string | number | null}
*/
function getRootVariable (varname)
{
	return window.getComputedStyle(document.body).getPropertyValue(varname) ?? null;
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
 * Gets a random number between a minimum and maximum range.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomMinMax (min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
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
	getRootVariable,
	mouseToCanvasCoordenates,
	tryParseJson,
	randomMinMax,
	httpFetch
}
