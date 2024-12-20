
class GUI
{
	static #guiObject = [];
	static #debugMode = false;
	static #drawTeamBackground = true;

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

	static isTeamBackgroundEnabled ()
	{
		return this.#drawTeamBackground;
	}
}

export default GUI;
