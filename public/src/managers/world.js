
class World
{
	static #cursorX = 0;
	static #cursorY = 0;

	static #ismouseclicked = false;
	static #ismousereleased = true;

	static #_gameObjects = [];

	static addGameObject (obj)
	{
		this.#_gameObjects.push(obj);
	}

	static get MouseX ()
	{
		return this.#cursorX;
	}

	static set MouseX (value)
	{
		this.#cursorX = value;
	}

	static get MouseY ()
	{
		return this.#cursorY;
	}

	static set MouseY (value)
	{
		this.#cursorY = value;
	}

	static get isMouseClicked ()
	{
		return this.#ismouseclicked;
	}

	static set isMouseClicked (value)
	{
		this.#ismouseclicked = value;
	}

	static get isMouseReleased ()
	{
		return this.#ismousereleased;
	}

	static set isMouseReleased (value)
	{
		this.#ismousereleased = value;
	}

	static get GameObjects ()
	{
		return this.#_gameObjects;
	}
}

export default World;
