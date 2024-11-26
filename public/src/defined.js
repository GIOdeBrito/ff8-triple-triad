

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

class GameObject2d
{
	#transform = Point.zero;
	#rotation = Point.zero;

	#resource = String();

	#id = '';

	constructor (id, x, y)
	{
		this.#id = id;
	}

	get Transform ()
	{
		return this.#transform;
	}

	set Transform (value)
	{
		this.#transform = value;
	}

	get Rotation ()
	{
		return this.#rotation;
	}

	set Rotation (value)
	{
		this.#rotation = value;
	}

	get ResourceName ()
	{
		return this.#resource;
	}

	set ResourceName (resource)
	{
		this.#resource = resource;
	}

	get Id ()
	{
		return this.#id;
	}
}

