// graphics/camera/RailCamera.js
import Camera from './Camera.js';

export default class RailCamera extends Camera {
  // Recibe un parámetro extra: la velocidad a la que se mueve la pantalla
  constructor(viewportWidth, viewportHeight, mapWidth, mapHeight, scrollSpeed = 2) {
    super(viewportWidth, viewportHeight, mapWidth, mapHeight);
    this.scrollSpeed = scrollSpeed; 
  }

  update(target, deltaTime) {
    // 1. La cámara avanza sola sin importar dónde esté el objetivo
    this.x += this.scrollSpeed;

    // 2. Si el jugador choca con el borde izquierdo de la pantalla, lo arrastramos
    // (Opcionalmente, aquí podrías restarle vida en lugar de moverlo)
    if (target.x < this.x) {
      target.x = this.x; 
    }

    // 3. Respetamos los límites del mapa
    this.clampToBounds();
  }
}