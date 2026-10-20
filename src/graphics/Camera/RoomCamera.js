// graphics/camera/RoomCamera.js
import Camera from './Camera.js';

export default class RoomCamera extends Camera {
  constructor(viewportWidth, viewportHeight, mapWidth, mapHeight) {
    super(viewportWidth, viewportHeight, mapWidth, mapHeight);
    
    // El tamaño de la "habitación" es idéntico al de tu Canvas
    this.roomWidth = viewportWidth;
    this.roomHeight = viewportHeight;
  }

  update(target, deltaTime) {
    // 1. Calculamos en qué fila y columna de la cuadrícula está el jugador
    // Si la pantalla mide 800 de ancho, y el jugador está en x=1650, 1650/800 = habitación 2 (índice 2)
    const currentRoomX = Math.floor(target.x / this.roomWidth);
    const currentRoomY = Math.floor(target.y / this.roomHeight);

    // 2. Colocamos la cámara en la esquina superior izquierda de esa habitación
    this.x = currentRoomX * this.roomWidth;
    this.y = currentRoomY * this.roomHeight;

    // 3. Respetamos los límites del mapa
    this.clampToBounds();
  }
}