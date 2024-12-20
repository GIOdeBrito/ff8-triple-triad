
window.addEventListener('load', function ()
{
	Canvas.start();
});

class Canvas
{
	static #canvas = null;
	static #ctx = null;

	static start ()
	{
		this.#canvas = window['board'] ?? null;
		this.#ctx = this.#canvas?.getContext('2d');
	}

	static getCanvas ()
	{
		return this.#canvas;
	}

	static getCtx ()
	{
		return this.#ctx;
	}

	static clear ()
	{
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
	}
}

export default Canvas;
