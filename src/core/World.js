import { PauseGameCommand } from "../commands/World/WorldCommands.js";

export default class World {
  constructor(backgroundColor = "#ffffff") {
    this.entities = [];
    this.backgroundColor = backgroundColor;
    this.paused = false;
    this.overlayUI = null;
    this.keyCommandMap = {
      Enter: new PauseGameCommand(),
    };
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  handleInput(inputHandler, deltaTime) {

    for (const key of inputHandler.getPressedKeys()) {
      const command = this.keyCommandMap[key];
      if (command) {
        command.execute(this);
      }
    }

    // Aqui se validan si el juego esta pausado y se renderiza el UI
    if (this.paused && this.overlayUI) {
      this.overlayUI.handleInput(inputHandler);
      return;
    }

    // Aqui se procesan los comandos par las entidades
    for (const entity of this.entities) {
      if (entity.handleInput) {
        entity.handleInput(inputHandler, deltaTime);
      }
    }
  }

  update(deltaTime) {
    if (this.paused) return;

    for (const entity of this.entities) {
      if (typeof entity.update === "function") {
        entity.update(deltaTime);
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const entity of this.entities) {
      entity.render(ctx);
    }

    // console.log("Paused:", this.paused, "overlayUI:", this.overlayUI);

    if (this.paused && this.overlayUI) {
      this.overlayUI.render(ctx);
    }
  }

}
