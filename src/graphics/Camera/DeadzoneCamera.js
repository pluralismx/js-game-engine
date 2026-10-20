import Camera from './Camera.js';
import { GAME_CONFIG } from '../../core/config.js';

export default class DeadzoneCamera extends Camera {
  constructor(mapWidth, mapHeight) {
    // Solo le pasamos 2 parámetros a la clase base
    super(mapWidth, mapHeight);

    // Leemos el tamaño real de la pantalla desde la configuración global
    const screenWidth = GAME_CONFIG.CANVAS_WIDTH;
    const screenHeight = GAME_CONFIG.CANVAS_HEIGHT;

    // Definimos el marco invisible usando las medidas correctas (800x450)
    this.deadzone = {
      x: screenWidth * 0.35,
      y: screenHeight * 0.3,
      width: screenWidth * 0.3,
      height: screenHeight * 0.4
    };
  }

  update(target, deltaTime) {
    // 1. Calculamos dónde están los bordes de la zona muerta en este momento
    const deadzoneLeft = this.x + this.deadzone.x;
    const deadzoneRight = this.x + this.deadzone.x + this.deadzone.width;
    const deadzoneTop = this.y + this.deadzone.y;
    const deadzoneBottom = this.y + this.deadzone.y + this.deadzone.height;

    // 2. Empuje horizontal (Eje X)
    if (target.x + target.width > deadzoneRight) {
      this.x = target.x + target.width - (this.deadzone.x + this.deadzone.width);
    } else if (target.x < deadzoneLeft) {
      this.x = target.x - this.deadzone.x;
    }

    // 3. Empuje vertical (Eje Y)
    if (target.y + target.height > deadzoneBottom) {
      this.y = target.y + target.height - (this.deadzone.y + this.deadzone.height);
    } else if (target.y < deadzoneTop) {
      this.y = target.y - this.deadzone.y;
    }

    // 4. Asegurarnos de que no muestre el vacío negro
    this.clampToBounds();
  }
}