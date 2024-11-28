
/* Triple triad game */

window.addEventListener('load', function ()
{
	start();
});

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
	// Loads game resources
	ResourceController.loadResources();

	// Store mouse position when inside the canvas
	getCanvas().addEventListener('mousemove', (ev) =>
	{
		const coordinates = mouseToCanvasCoordenates(ev.clientX, ev.clientY);

		World.MouseX = coordinates.X;
		World.MouseY = coordinates.Y;
	});

	let funguar = new GameObject2d('testfunguar');
	funguar.ResourceName = 'CardFunguar';

	let diabalos = new GameObject2d('testdiabalos', new Point(100, 250), new Point(124, 124));
	diabalos.ResourceName = 'CardDiabolos';
	diabalos.OnCursor = function () { console.log('Diaasaas'); };

	World.addGameObject(funguar);
	World.addGameObject(diabalos);

	gameLoop();
}

function createCards ()
{
	let allCards = [];
}

function gameLoop ()
{
	let canvas = getCanvas();
	let ctx = canvas.getContext('2d');

	ResourceController.getCards();

	const mainLoop = () =>
	{
		drawCanvas(ctx, canvas);

		requestAnimationFrame(mainLoop);
	};

	mainLoop();
}

function drawCanvas (ctx, canvas)
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let board = ResourceController.getResource('Board');

	// Stops if the board resource is null
	if(!board)
	{
		return;
	}

	// Board is always at the bottom
	ctx.drawImage(board.Image, 0, 0);

	const drawCollision = true;

	// Draw game objects
	for(let gameObject of World.GameObjects)
	{
		let resource = ResourceController.getResource(gameObject.ResourceName);

		gameObject.Update();

		// Skip if resource is null
		if(!resource)
		{
			continue;
		}

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

