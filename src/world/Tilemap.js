import { TileProperties } from './TileTypes.js';

export class Tilemap {
  constructor(mapData) {
    this.width = mapData.width;
    this.height = mapData.height;
    this.tileSize = mapData.tileSize;
    this.tiles = mapData.tiles;
  }

  // Retorna las propiedades del azulejo en una coordenada de píxeles
  getTileAtPixel(pixelX, pixelY) {
    const col = Math.floor(pixelX / this.tileSize);
    const row = Math.floor(pixelY / this.tileSize);

    // Evitar errores de índices fuera del mapa
    if (col < 0 || col >= this.width || row < 0 || row >= this.height) {
      return null;
    }

    const tileId = this.tiles[row][col];
    return TileProperties[tileId];
  }

  // Retorna true si un rectángulo está tocando algún bloque sólido
  checkCollision(rect) {
    // Calculamos qué columnas y filas del mapa abarca el rectángulo
    const startCol = Math.floor(rect.x / this.tileSize);
    const endCol = Math.floor((rect.x + rect.width - 0.1) / this.tileSize);
    const startRow = Math.floor(rect.y / this.tileSize);
    const endRow = Math.floor((rect.y + rect.height - 0.1) / this.tileSize);

    // Revisamos cada azulejo en esa área
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        // Bloquear salida de pantalla por los lados o abajo como si fuera sólido
        if (col < 0 || col >= this.width || row >= this.height) return true;
        // Permitir salir por arriba
        if (row < 0) continue;

        const tileId = this.tiles[row][col];
        const properties = TileProperties[tileId];
        
        if (properties && properties.isSolid) {
          return true; // Hay colisión
        }
      }
    }
    return false; // No hay colisión
  }

  // Función para dibujar el mapa entero en un frame
  render(context, cameraX = 0, cameraY = 0) {
    // Recorremos las filas (Y)
    for (let y = 0; y < this.height; y++) {
      // Recorremos las columnas (X)
      for (let x = 0; x < this.width; x++) {
        const tileId = this.tiles[y][x];
        
        // Si no es AIRE (0), procedemos a dibujarlo
        if (tileId !== 0) {
          const properties = TileProperties[tileId];
          
          if (properties) {
            // Posición real en píxeles
            const pixelX = (x * this.tileSize) - cameraX;
            const pixelY = (y * this.tileSize) - cameraY;

            // Dibujar el bloque de color
            context.fillStyle = properties.color;
            context.fillRect(pixelX, pixelY, this.tileSize, this.tileSize);

            // (Opcional) Dibujar un borde suave para distinguir los bloques
            context.strokeStyle = 'rgba(0,0,0,0.1)';
            context.strokeRect(pixelX, pixelY, this.tileSize, this.tileSize);
          }
        }
      }
    }
  }
}