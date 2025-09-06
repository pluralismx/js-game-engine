import {
  AcceptOptionCommand,
  SelectNextOptionCommand,
  SelectPreviousOptionCommand
} from "../commands/UI/UICommands.js";

export default class UI {

  constructor(options = []) {
    this.options = options;
    this.selectedIndex = 0;
    this.keyCommandMap = {
      KeyS: new SelectNextOptionCommand(),
      KeyW: new SelectPreviousOptionCommand(),
      // Enter: new AcceptOptionCommand(),
      Space: new AcceptOptionCommand(),
    };
  }

  setOptions(options) {
    this.options = options;
    this.selectedIndex = 0;
  }

  getSelectedOption() {
    return this.options[this.selectedIndex];
  }

  handleInput(inputHandler) {
    for (const key of inputHandler.getJustPressedKeys()) {
      const command = this.keyCommandMap[key];
      if (command) {
        command.execute(this);
      }
    }
  }

  update() {}

  render(ctx) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < this.options.length; i++) {
      const y = 180 + i * 40;
      ctx.fillStyle = i === this.selectedIndex ? "#00FF00" : "#FFFFFF";
      ctx.fillText(this.options[i], ctx.canvas.width / 2, y);
    }
  }

}
