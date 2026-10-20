// physics/BoundingBox.js

export default class BoundingBox {
    constructor(offsetX, offsetY, width, height) {
      // Posición relativa al sprite
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.width = width;
      this.height = height;
  
      // Coordenadas reales en el mundo (se actualizan cada frame)
      this.x = 0;
      this.y = 0;
    }
  
    // Actualiza la posición de la caja basándose en la entidad que la posee
    update(entityX, entityY, entityWidth, isFacingRight) {
      let currentOffsetX = this.offsetX;
      
      // Si el personaje voltea a la izquierda, la caja debe espejarse
      if (!isFacingRight) {
        currentOffsetX = entityWidth - this.width - this.offsetX;
      }
  
      this.x = entityX + currentOffsetX;
      this.y = entityY + this.offsetY;
    }
  
    // La fórmula mágica de colisión AABB: devuelve true si se superpone con otra caja
    intersects(otherBox) {
      return (
        this.x < otherBox.x + otherBox.width &&
        this.x + this.width > otherBox.x &&
        this.y < otherBox.y + otherBox.height &&
        this.y + this.height > otherBox.y
      );
    }
  
    // Método de ayuda para ver las cajas en pantalla
    drawDebug(ctx, color = 'white') {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }