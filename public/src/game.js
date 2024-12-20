
import ResourceManager from "./managers/resourcemanager.js";
import CardManager from "./managers/cardmanager.js";
import Canvas from "./managers/canvas.js";
import { mouseToCanvasCoordenates, getRootVariable, randomMinMax } from "./utility.js";
import TextDialog from "./managers/textdialog.js";
import GameObject2d from "./core/gameobject2d.js";
import Point from "./models/point.js";
import World from "./managers/world.js";
import GUI from "./managers/gui.js";

function start ()
{
	// Store mouse position when inside the canvas
	Canvas.getCanvas().addEventListener('mousemove', (ev) =>
	{
		const coordinates = mouseToCanvasCoordenates(ev.clientX, ev.clientY);

		World.MouseX = coordinates.X;
		World.MouseY = coordinates.Y;
	});

	Canvas.getCanvas().addEventListener('mousedown', (ev) =>
	{
		World.isMouseClicked = true;
		World.isMouseReleased = false;
	});

	Canvas.getCanvas().addEventListener('mouseup', (ev) =>
	{
		World.isMouseReleased = true;
	});

	setCardTable();
	gameLoop();
}

function gameLoop ()
{
	const mainLoop = () =>
	{
		drawCanvas(Canvas.getCtx(), Canvas.getCanvas());

		requestAnimationFrame(mainLoop);

		World.isMouseClicked = false;
	};

	mainLoop();
}

function setCardTable ()
{
	let cards = CardManager.getAllCards().toArray();

	cards.forEach(item =>
	{
		let cardObject = new GameObject2d(item.Id, new Point(randomMinMax(0,740), randomMinMax(0,400)), new Point(124, 124));
		cardObject.ResourceName = item.ResourceName;

		cardObject.OnCursor = () =>
		{
			TextDialog.setText(item.Name);

			if(!World.isMouseReleased)
			{
				cardObject.Transform.X = World.MouseX - 124/2;
				cardObject.Transform.Y = World.MouseY - 124/2;
			}
		};

		cardObject.OnCursorEnter = () =>
		{
			//cardObject.translate(3, 0, -900);
		};

		World.addGameObject(cardObject);
	});
}

function drawCanvas (ctx, canvas)
{
	Canvas.clear();

	let board = ResourceManager.getResource('Board');

	// Board is always at the bottom
	ctx.drawImage(board.Image, 0, 0);

	// Draw game objects
	for(let gameObject of World.GameObjects)
	{
		let resource = ResourceManager.getResource(gameObject.ResourceName);

		gameObject.Update();

		let posX = gameObject.Transform.X;
		let posY = gameObject.Transform.Y;

		// Draw card background color
		if(GUI.isTeamBackgroundEnabled)
		{
			let color = getRootVariable('--color-team-1');

			ctx.fillStyle = color;
			ctx.fillRect(posX, posY, gameObject.BoundingBox.X, gameObject.BoundingBox.Y);
		}

		ctx.drawImage(resource.Image, posX, posY);

		if(GUI.isDebug)
		{
			let color = getRootVariable('--color-collision');

			ctx.fillStyle = color;
			ctx.fillRect(posX, posY, gameObject.BoundingBox.X, gameObject.BoundingBox.Y);
		}
	}

	let cursor = ResourceManager.getResource('Cursor');

	if(GUI.IsCursorInterested)
	{
		cursor = ResourceManager.getResource('CursorPointer');
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
	start
}
