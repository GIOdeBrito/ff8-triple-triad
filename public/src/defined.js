

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
	#transform;
	#rotation = Point.zero;
	#boundingbox;

	#resource = String();

	#isOnTrigger = false;

	#onupdate = function () { };
	#oncursorover = null;

	#id = '';

	constructor (id, transform = null, box = null)
	{
		this.#id = id;

		this.#transform = transform ?? Point.zero;
		this.#boundingbox = box ?? Point.zero;
	}

	set OnUpdate (func)
	{
		this.#onupdate = func;
	}

	Update ()
	{
		if(this.#oncursorover)
		{
			this.CursorOverInvoke();
		}

		this.#onupdate();
	}

	set OnCursor (func)
	{
		this.#oncursorover = func;
	}

	CursorOverInvoke ()
	{
		let cursorPosX = World.MouseX;
		let cursorPosY = World.MouseY;

		// Checks if the cursor overlaps with the object
		if(cursorPosX > this.Transform.X && cursorPosX < (this.Transform.X + this.BoundingBox.X)
		&& cursorPosY > this.Transform.Y && cursorPosY < (this.Transform.Y + this.BoundingBox.Y))
		{
			this.#isOnTrigger = true;
			this.#oncursorover();

			GUI.IsCursorInterested = true;

			return;
		}

		this.#isOnTrigger = false;
		GUI.IsCursorInterested = false;
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

	set BoundingBox (box)
	{
		this.#boundingbox = box;
	}

	get BoundingBox ()
	{
		return this.#boundingbox;
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

