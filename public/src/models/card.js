
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

	get Id ()
	{
		return this.#id;
	}

	get Name ()
	{
		return this.#name;
	}

	get ResourceName ()
	{
		return this.#resource;
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

export default Card;
