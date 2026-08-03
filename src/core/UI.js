import {
  AcceptOptionCommand,
  SelectNextOptionCommand,
  SelectPreviousOptionCommand
} from "../input/commands/UI/UICommands.js";

export default class UI {

  constructor(options = []) {
    this.options = options;
    this.selectedIndex = 0;
  }

  setOptions(options) {
    this.options = options;
    this.selectedIndex = 0;
  }

  getSelectedOption() {
    return this.options[this.selectedIndex];
  }

  handleInput(inputMapper) {
    if (inputMapper.wasActionPressed("up")) {
      new SelectPreviousOptionCommand().execute(this);
    }

    if (inputMapper.wasActionPressed("down")) {
      new SelectNextOptionCommand().execute(this);
    }

    if (inputMapper.wasActionPressed("select")) {
      new AcceptOptionCommand().execute(this);
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
