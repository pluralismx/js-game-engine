import { GAME_CONFIG } from '../../core/config.js'

export default class Camera {
  // Punto 1 resuelto: Solo pedimos el tamaño dinámico del mapa
  constructor(mapWidth, mapHeight) {
    if (new.target === Camera) {
      throw new Error("No instanciar Camera directamente.");
    }

    this.x = 0;
    this.y = 0;
    
    // Punto 2 resuelto: El viewport estandarizado
    this.viewportWidth = GAME_CONFIG.CANVAS_WIDTH;
    this.viewportHeight = GAME_CONFIG.CANVAS_HEIGHT;
    
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  update(target, deltaTime) {
    throw new Error("Implementar en la subclase.");
  }

  clampToBounds() {
    this.x = Math.max(0, Math.min(this.x, this.mapWidth - this.viewportWidth));
    this.y = Math.max(0, Math.min(this.y, this.mapHeight - this.viewportHeight));
  }

  applyTransform(ctx) {
    ctx.save();
    ctx.translate(-Math.floor(this.x), -Math.floor(this.y));
  }

  restoreTransform(ctx) {
    ctx.restore();
  }
}