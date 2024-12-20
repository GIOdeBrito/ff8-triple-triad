
var timer = null;

class TextDialog
{
	static setText ()
	{
		let paragraph = document.querySelector('div[data-id="text-dialog"] > p');

		paragraph.innerText = name;

		paragraph.parentElement.style.opacity = 1;

		clearTimeout(timer);

		timer = setTimeout(() => paragraph.parentElement.style.opacity = 0, 1000);
	}
}

export default TextDialog;
