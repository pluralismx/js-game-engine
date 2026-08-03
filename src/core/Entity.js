export default class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    
    // Dimensiones por defecto
    this.width = 32;
    this.height = 32;

    // Velocidad actual
    this.vx = 0;
    this.vy = 0;

    // Propiedades físicas
    this.gravity = 0.5;
    this.maxFallSpeed = 12;
    this.friction = 0.8;
    this.speed = 4;
    
    // Flags de estado
    this.isMovingH = false;
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
    // 1. Aplicar la gravedad (la velocidad Y siempre intenta ir hacia abajo)
    this.vy += this.gravity;

    // Limitar la velocidad de caída
    if (this.vy > this.maxFallSpeed) {
      this.vy = this.maxFallSpeed;
    }

    // 2. Aplicar fricción (solo si el jugador NO está moviéndose activamente)
    if (!this.isMovingH) {
      this.vx *= this.friction;
    }
    this.isMovingH = false; // Resetear para el siguiente frame

    // 3. Frenado en seco si es muy lento (evita moverse en micro-decimales)
    if (Math.abs(this.vx) < 0.1) {
      this.vx = 0;
    }

    // --- FÍSICA Y COLISIONES CON EL MAPA ---
    if (tilemap) {
      // 3. Mover en el eje X y resolver colisiones
      this.x += this.vx;
      if (tilemap.checkCollision(this)) {
        // Si chocamos, regresamos a la posición anterior exacta y perdemos velocidad
        this.x -= this.vx; 
        this.vx = 0;
      }

      // 4. Mover en el eje Y y resolver colisiones
      this.y += this.vy;
      if (tilemap.checkCollision(this)) {
        // Guardamos un pequeño flag para saber si tocamos el piso
        this.isOnGround = this.vy > 0;
        
        // Si chocamos, regresamos a la posición anterior y perdemos velocidad
        this.y -= this.vy; 
        this.vy = 0;
      } else {
        this.isOnGround = false; // Estamos cayendo o saltando
      }
    } else {
      // Movimiento simple si no hay mapa cargado
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  render(ctx) {

  }
}
