
let timer = null;

function windowShowText (name)
{
	let paragraph = document.querySelector('div[id="WindowBox"] > p');

	paragraph.innerText = name;

	paragraph.parentElement.style.opacity = 1;

	clearTimeout(timer);

	timer = setTimeout(() => paragraph.parentElement.style.opacity = 0, 1000);
}

export {
	windowShowText
}
