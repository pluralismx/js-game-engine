import { PauseGameCommand } from "../input/commands/World/WorldCommands.js";

export default class Scene {
  constructor(backgroundColor = "#ffffff") {
    this.entities = [];
    this.backgroundColor = backgroundColor;
    this.paused = false;
    this.overlayUI = null;
    this.tilemap = null; // Mapa de tiles del mundo
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  handleInput(inputMapper, deltaTime) {
    if (inputMapper.wasActionPressed("pause")) {
      new PauseGameCommand().execute(this, inputMapper);
    }

    if (this.paused && this.overlayUI) {
      this.overlayUI.handleInput(inputMapper);
      return;
    }

    for (const entity of this.entities) {
      entity.handleInput(inputMapper, deltaTime);
    }
  }

  update(deltaTime) {
    if (this.paused) return;

    for (const entity of this.entities) {
      entity.update(deltaTime, this.tilemap); // Pasamos el tilemap a las entidades
    }
  }

  render(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Renderizar el mapa de tiles si existe (debe ser dibujado antes que las entidades)
    if (this.tilemap) {
      this.tilemap.render(ctx);
    }

    for (const entity of this.entities) {
      entity.render(ctx);
    }

    if (this.paused && this.overlayUI) {
      this.overlayUI.render(ctx);
    }
  }

}
