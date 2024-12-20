
import Point from "../models/point.js";
import World from "../managers/world.js";
import GUI from "../managers/gui.js";

class GameObject2d
{
	#transform;
	#rotation = Point.zero;
	#boundingbox;

	#resource = String();

	#isOnTrigger = false;

	#onupdate = function () { };
	#oncursorover = null;
	#oncursorenter = null;

	#translationOptions = null;

	#id = '';

	constructor (id, transform = null, box = null)
	{
		this.#id = id;

		this.#transform = transform ?? Point.zero;
		this.#boundingbox = box ?? Point.zero;
	}

	Update ()
	{
		this.#CursorFunctionsInvoke();

		if(this.#translationOptions)
		{
			switch(this.#translationOptions)
			{
				case "translate": this.#ObjectTranslation(); break;
				case "move": this.#ObjectMove(); break;
			}
		}

		this.#onupdate();
	}

	createProperty (name, value)
	{
		this[name] = value;
	}

	translate (speed, x, y)
	{
		const obj = {
			x: x,
			y: y,
			speed: speed,
			elapsedx: 0,
			elapsedy: 0,
			type: "translate"
		};

		this.#translationOptions = obj;
	}

	moveTo (speed, x, y)
	{
		const obj = {
			x: x,
			y: y,
			speed: speed,
			elapsedx: 0,
			elapsedy: 0,
			type: "move"
		};

		this.#translationOptions = obj;
	}

	#CursorFunctionsInvoke ()
	{
		let cursorPosX = World.MouseX;
		let cursorPosY = World.MouseY;

		// Checks if the cursor overlaps with the object
		if(cursorPosX > this.Transform.X && cursorPosX < (this.Transform.X + this.BoundingBox.X)
		&& cursorPosY > this.Transform.Y && cursorPosY < (this.Transform.Y + this.BoundingBox.Y))
		{
			// Runs once the on enter function
			if(this.#oncursorenter && !this.#isOnTrigger)
			{
				this.#oncursorenter();
			}

			this.#isOnTrigger = true;

			if(this.#oncursorover)
			{
				this.#oncursorover();
			}

			GUI.IsCursorInterested = true;

			return;
		}

		if(this.#isOnTrigger)
		{
			this.#isOnTrigger = false;
			GUI.IsCursorInterested = false;
		}
	}

	#ObjectTranslation ()
	{
		const magicNum = 0.012;

		let speed = this.#translationOptions.speed;
		let moveX = (this.#translationOptions.x * speed) * magicNum;
		let moveY = (this.#translationOptions.y * speed) * magicNum;

		this.Transform.X += moveX;
		this.#translationOptions.elapsedx += moveX;

		this.Transform.Y += moveY;
		this.#translationOptions.elapsedy += moveY;

		if(Math.abs(this.#translationOptions.elapsedx) >= Math.abs(this.#translationOptions.x)
		&& Math.abs(this.#translationOptions.elapsedy) >= Math.abs(this.#translationOptions.y))
		{
			this.#translationOptions = null;
		}
	}

	#ObjectMove ()
	{

	}

	set OnUpdate (func)
	{
		this.#onupdate = func;
	}

	/**
	* Runs once per frame when triggered.
	*/
	set OnCursor (func)
	{
		this.#oncursorover = func;
	}

	/**
	* Runs only once when triggered.
	*/
	set OnCursorEnter (func)
	{
		this.#oncursorenter = func;
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

export default GameObject2d;
