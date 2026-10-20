// core/Scene.js
import { PauseGameCommand } from "../input/commands/World/WorldCommands.js";

export default class Scene {
  constructor(backgroundColor = "#ffffff") {
    this.entities = [];
    this.controllableEntities = [];
    this.backgroundColor = backgroundColor;
    this.paused = false;
    this.overlayUI = null;
    this.tilemap = null;
    
    // Agregamos soporte base para la cámara y su objetivo
    this.camera = null;
    this.cameraTarget = null;
  }

  async preload() {}
  async create() {}
  
  addEntity(entity, isControllable = false) {
    this.entities.push(entity);
    if (isControllable) {
      this.controllableEntities.push(entity);
    }
  }

  // Método utilitario opcional para vincular la cámara más fácilmente
  setupCamera(camera, target) {
    this.camera = camera;
    this.cameraTarget = target;
  }

  handleInput(inputMapper, deltaTime) {
    if (inputMapper.wasActionPressed("pause")) {
      new PauseGameCommand().execute(this, inputMapper);
    }

    if (this.paused && this.overlayUI) {
      this.overlayUI.handleInput(inputMapper);
      return;
    }
    
    for (const entity of this.controllableEntities) {
      entity.handleInput(inputMapper, deltaTime);
    }
  }

  update(deltaTime) {
    if (this.paused) return;

    for (const entity of this.entities) {
      entity.update(deltaTime, this.tilemap); 
    }

    // Actualizamos la cámara automáticamente si existe
    if (this.camera && this.cameraTarget) {
      this.camera.update(this.cameraTarget, deltaTime);
    }
  }

  render(ctx) {
    // 1. Dibujar el fondo (Fijo, sin moverse)
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 2. --- INICIA VISTA DE CÁMARA ---
    if (this.camera) {
      this.camera.applyTransform(ctx);
    }

    // 3. Dibujar el mundo (afectado por el desplazamiento)
    if (this.tilemap) {
      this.tilemap.render(ctx);
    }

    for (const entity of this.entities) {
      entity.render(ctx);
    }

    // 4. --- TERMINA VISTA DE CÁMARA ---
    if (this.camera) {
      this.camera.restoreTransform(ctx);
    }

    // 5. Dibujar UI (Menús, Vidas, Score) para que queden pegados a la pantalla
    if (this.paused && this.overlayUI) {
      this.overlayUI.render(ctx);
    }
  }
}