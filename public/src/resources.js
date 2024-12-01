
import { Resource } from "./models.js";
import { httpFetch, tryParseJson } from "./utility.js";

var resourceList = [];

class ResourceController
{
	/**
	* Fetch and loads the game's resources into memory.
	* @return {Promise<boolean>}
	* @async
	* @static
	*/
	static async loadResources ()
	{
		let response = await httpFetch('public/json/resources.json');

		response.forEach(item =>
		{
			let resource = new Resource(item.name, item.path);

			let img = new Image();
			img.src = resource.Path;
			img.onload = () =>
			{
				resource.Image = img;

				resourceList.push(resource);
			};
		});

		return new Promise(resolve =>
		{
			resolve(true);
		});
	}

	/**
	* Fetch and loads the game's resources into memory.
	* @param {string} name - Resource name / id.
	* @return {number}
	* @static
	*/
	static getResource (name)
	{
		let index = resourceList.findIndex(item => item.Name === name);

		if(index < 0)
		{
			return null;
		}

		return resourceList[index];
	}

	static getCards ()
	{
		let cards = resourceList.filter(item =>
		{
			if(!item.Name.includes('Card'))
			{
				return;
			}

			return item;
		});
	}
}

export {
	ResourceController,
}
