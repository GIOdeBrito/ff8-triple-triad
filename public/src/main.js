
import ResourceManager from "./managers/resourcemanager.js";
import CardManager from "./managers/cardmanager.js";
import { start } from "./game.js";
import World from "./managers/world.js";
import GUI from "./managers/gui.js";

window.addEventListener('load', async () =>
{
	// Loads game resources
	await ResourceManager.loadResources();

	// Loads the cards
	await CardManager.loadCardsData();

	start();
});
