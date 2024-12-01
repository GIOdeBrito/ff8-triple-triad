

function windowShowText (name)
{
	let paragraph = document.querySelector('div[id="WindowBox"] > p');

	paragraph.innerText = name;
}

function windowHide ()
{

}

export {
	windowShowText,
	windowHide
}
