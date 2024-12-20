
class Point
{
	#x = 0;
	#y = 0;

	constructor (x, y)
	{
		this.#x = x;
		this.#y = y;
	}

	get X ()
	{
		return this.#x;
	}

	set X (value)
	{
		this.#x = value;
	}

	get Y ()
	{
		return this.#y;
	}

	set Y (value)
	{
		this.#y = value;
	}

	static get zero ()
	{
		return new Point(0, 0);
	}
}

export default Point;
