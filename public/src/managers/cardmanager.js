
import Card from "../models/card.js";
import Tuple from "../helpers/tuple.js";
import { httpFetch } from "../utility.js";

var cards = [];

class CardManager
{
	/**
	* Loads the cards data.
	* @return {Promise<boolean>}
	* @async
	* @static
	*/
	static async loadCardsData ()
	{
		let response = await httpFetch('public/json/cards.json');

		response.forEach(item =>
		{
			let gamecard = new Card(item.id, item.name, item.resource_name);

			gamecard.Stats = item.stats;
			gamecard.Description = item.description;

			cards.push(gamecard);
		});

		return new Promise(resolve =>
		{
			resolve(true);
		});
	}

	static getAllCards ()
	{
		return new Tuple(...cards);
	}

	static getCardByName (name)
	{
		let card = cards.find(item => item.Name === name);

		return card;
	}

	static getCardById (id)
	{
		let card = cards.find(item => item.id === id);

		return card;
	}
}

export default CardManager;

