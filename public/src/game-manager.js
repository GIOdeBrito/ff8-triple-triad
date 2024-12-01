
import { ResourceController } from "./resources.js";
import CardDatabase from "./card-db.js";
import { start, World, GUI } from "./game.js";

window.addEventListener('load', async () =>
{
	// Loads game resources
	await ResourceController.loadResources();

	// Loads the cards
	await CardDatabase.loadCardsData();

	start();
});
