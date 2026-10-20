export default class Entity {
  constructor(x = 0, y = 0) {
    // --- 1. PROPIEDADES DE DIBUJO ---
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;

    // --- 2. PROPIEDADES DE MOVIMIENTO (FÍSICA KINEMÁTICA) ---
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.5;
    this.maxFallSpeed = 12;
    this.friction = 0.8;
    this.speed = 4;
    
    // --- 3. PROPIEDADES DE ESTADO ---
    this.isOnGround = false;
    this.isMovingH = false;

    // --- 4. LAS CAJAS DE COLISIÓN (Se inicializan nulas por defecto) ---
    this.collisionBox = null; // Para chocar con paredes y piso
    this.hurtbox = null;    // Para recibir daño
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocityX(vx) {
    this.vx = vx;
    this.isMovingH = true; // Registramos que hubo movimiento explícito este frame
  }

  setVelocityY(vy) {
    this.vy = vy;
  }

  handleInput(inputMapper, deltaTime) {
    // Implementado por las clases hijas (ej. Player)
  }

  update(deltaTime, tilemap = null) {
    // 1. Aplicar la gravedad
    this.vy += this.gravity;
    if (this.vy > this.maxFallSpeed) this.vy = this.maxFallSpeed;

    // 2. Aplicar fricción y frenado
    if (!this.isMovingH) this.vx *= this.friction;
    this.isMovingH = false; 
    if (Math.abs(this.vx) < 0.1) this.vx = 0;

    // --- FÍSICA Y COLISIONES CON EL MAPA ---
    if (tilemap) {
      
      // -- EJE X --
      this.x += this.vx;
      this.updateBoxes(); // 1. Sincronizamos la caja con la nueva posición X
      
      // 2. Usamos la collisionBox si existe, de lo contrario usamos la Entidad entera (fallback)
      const boxX = this.collisionBox ? this.collisionBox : this;

      if (tilemap.checkCollision(boxX)) {
        this.x -= this.vx; // ¡Choque! Regresamos a la posición anterior
        this.vx = 0;
        this.updateBoxes(); // Sincronizamos la caja a la posición corregida
      }

      // -- EJE Y --
      this.y += this.vy;
      this.updateBoxes(); // 3. Sincronizamos la caja con la nueva posición Y

      const boxY = this.collisionBox ? this.collisionBox : this;

      if (tilemap.checkCollision(boxY)) {
        this.isOnGround = this.vy > 0;
        
        this.y -= this.vy; // ¡Choque! Regresamos a la posición anterior
        this.vy = 0;
        this.updateBoxes(); // Sincronizamos la caja a la posición corregida
      } else {
        this.isOnGround = false; 
      }

    } else {
      // Movimiento simple si no hay mapa
      this.x += this.vx;
      this.y += this.vy;
      this.updateBoxes();
    }
  }

  updateBoxes() {
    // isFacingRight puede venir de la subclase Player. Si no existe, asume true.
    const facingRight = this.isFacingRight !== undefined ? this.isFacingRight : true;

    if (this.collisionBox) {
      this.collisionBox.update(this.x, this.y, this.width, facingRight);
    }
    if (this.hurtbox) {
      this.hurtbox.update(this.x, this.y, this.width, facingRight);
    }
  }

  render(ctx) {

  }
}
