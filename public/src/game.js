
import { ResourceController } from "./resources.js";
import CardDatabase from "./card-db.js";
import { mouseToCanvasCoordenates, getCanvas, randomMinMax } from "./utility.js";
import { windowShowText } from "./window-box.js";
import { Point, GameObject2d } from "./models.js";

class GUI
{
	static #guiObject = [];
	static #debugMode = true;

	static #isCursorInterested = false;

	static addGuiObject ()
	{

	}

	static get IsCursorInterested ()
	{
		return this.#isCursorInterested;
	}

	static set IsCursorInterested (value)
	{
		this.#isCursorInterested = value;
	}

	static get GuiObjects ()
	{
		return this.#guiObject;
	}

	static get IsDebug ()
	{
		return this.#debugMode;
	}
}

class World
{
	static #cursorX = 0;
	static #cursorY = 0;

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

	static get GameObjects ()
	{
		return this.#_gameObjects;
	}
}

function start ()
{
	// Store mouse position when inside the canvas
	getCanvas().addEventListener('mousemove', (ev) =>
	{
		const coordinates = mouseToCanvasCoordenates(ev.clientX, ev.clientY);

		World.MouseX = coordinates.X;
		World.MouseY = coordinates.Y;
	});

	setCardTable();
	gameLoop();
}

function setCardTable ()
{
	let cards = CardDatabase.getAllCards().toArray();

	cards.forEach(item =>
	{
		let cardObject = new GameObject2d(item.Id, new Point(randomMinMax(0,740), randomMinMax(0,400)), new Point(124, 124));
		cardObject.ResourceName = item.ResourceName;

		cardObject.OnCursor = () =>
		{
			windowShowText(item.Name);
		};

		World.addGameObject(cardObject);
	});

	console.log(World.GameObjects);
}

function gameLoop ()
{
	let canvas = getCanvas();
	let ctx = canvas.getContext('2d');

	const mainLoop = () =>
	{
		drawCanvas(ctx, canvas);

		requestAnimationFrame(mainLoop);
	};

	mainLoop();
}

function drawCanvas (ctx, canvas)
{
	// Erases the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let board = ResourceController.getResource('Board');

	// Board is always at the bottom
	ctx.drawImage(board.Image, 0, 0);

	const drawCollision = true;

	// Draw game objects
	for(let gameObject of World.GameObjects)
	{
		let resource = ResourceController.getResource(gameObject.ResourceName);

		gameObject.Update();

		let posX = gameObject.Transform.X;
		let posY = gameObject.Transform.Y;

		ctx.drawImage(resource.Image, posX, posY);

		if(drawCollision)
		{
			let color = window.getComputedStyle(document.body).getPropertyValue('--color-collision');

			ctx.fillStyle = color;
			ctx.fillRect(posX, posY, gameObject.BoundingBox.X, gameObject.BoundingBox.Y);
		}
	}

	let cursor = ResourceController.getResource('Cursor');

	if(GUI.IsCursorInterested)
	{
		cursor = ResourceController.getResource('CursorPointer');
	}

	// Cursor is drawn over everything
	ctx.drawImage(cursor.Image, World.MouseX, World.MouseY, 32, 32);

	if(GUI.IsDebug)
	{
		ctx.fillText(World.MouseX, 10, 10);
		ctx.fillText(World.MouseY, 10, 30);
	}
}

export {
	start,
	World,
	GUI
}
