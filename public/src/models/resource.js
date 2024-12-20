
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

export default Resource;
