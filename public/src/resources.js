
var resourceList = [];

class ResourceController
{
	static loadResources ()
	{
		const toLoad =
		[
			new Resource('Board', 'public/triad-board.webp'),
			new Resource('Cursor', 'public/sprites/cursor.webp'),
			new Resource('CardFunguar', 'public/sprites/cards/funguar.webp'),
			new Resource('CardDiabolos', 'public/sprites/cards/diabolos.webp')
		];

		toLoad.forEach(item =>
		{
			let img = new Image();
			img.src = item.Path;
			img.onload = () =>
			{
				item.Image = img;

				resourceList.push(item);
			};
		});
	}

	static getResource (name)
	{
		let index = resourceList.findIndex(item => item.Name === name);

		if(index < 0)
		{
			return null;
		}

		return resourceList[index];
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
