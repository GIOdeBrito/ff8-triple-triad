
import { World, GUI } from "./game.js";

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

class Tuple
{
	#count = 0;

	constructor (...params)
	{
		params.forEach((parameter, i) =>
		{
			this['Item' + (i + 1)] = parameter;
		});

		this.#count++;
	}

	get Count ()
	{
		return this.#count;
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

class Resource
{
	#name = '';
	#path = '';
	#image = null;

	constructor(name, path)
	{
		this.#name = name;
		this.#path = path;
	}

	get Name ()
	{
		return this.#name;
	}

	get Path ()
	{
		return this.#path;
	}

	get Image ()
	{
		return this.#image;
	}

	set Image (img)
	{
		this.#image = img;
	}
}

class Card
{
	#id = String();
	#name = String();
	#desc = String();
	#resource = String();
	#stats = Object();

	constructor (id, name, resource)
	{
		this.#id = id;
		this.#name = name;
		this.#resource = resource;
	}

	get Name ()
	{
		return this.#name;
	}

	get Stats ()
	{
		return this.#stats;
	}

	set Stats (value)
	{
		const obj = {
			top: value[0] ?? 0,
			left: value[1] ?? 0,
			right: value[2] ?? 0,
			down: value[3] ?? 0,
		};

		this.#stats = obj;
	}

	get Description ()
	{
		return this.#desc;
	}

	set Description (value)
	{
		this.#desc = value;
	}
}

export {
	Point,
	GameObject2d,
	Resource,
	Tuple,
	Card
}

