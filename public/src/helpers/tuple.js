
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

	toArray ()
	{
		let items = [];

		for(let i = 0; i <= this.#count; i++)
		{
			items.push(this['Item' + (i + 1)]);
		}

		return items;
	}
}

export default Tuple;
