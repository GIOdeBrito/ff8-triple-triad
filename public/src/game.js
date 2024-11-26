
/* Triple triad game */

window.addEventListener('load', function ()
{
	start();
});

class Global
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
	getCanvas().addEventListener('mousemove', function (ev)
	{
		Global.MouseX = ev.clientX;
		Global.MouseY = ev.clientY;
	});

	let funguar = new GameObject2d('testfunguar');
	funguar.ResourceName = 'CardFunguar';

	let diabalos = new GameObject2d('testdiabalos');
	diabalos.ResourceName = 'CardDiabolos';

	diabalos.Transform = new Point(100, 250);

	Global.addGameObject(funguar);
	Global.addGameObject(diabalos);

	gameLoop();
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(!resourceList[0]?.Image)
	{
		return;
	}

	// Board is always at the bottom
	ctx.drawImage(resourceList[0]?.Image, 0, 0);

	// Draw game objects
	for(let gameObject of Global.GameObjects)
	{
		let resource = ResourceController.getResource(gameObject.ResourceName);

		// Skip if resource is not found
		if(!resource)
		{
			continue;
		}

		ctx.drawImage(resource.Image, gameObject.Transform.X, gameObject.Transform.Y);

		gameObject.Transform.X += .5;
	}

	// Cursor is drawn over everything
	ctx.drawImage(resourceList[1]?.Image, Global.MouseX - (768 / 2), Global.MouseY - (300 / 2), 40, 40);
}

function getCanvas ()
{
	return window['board'] ?? null;
}

