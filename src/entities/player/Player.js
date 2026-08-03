import Entity from '../../core/Entity.js';
import IdleState from './states/IdleState.js';

export default class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.color = 'blue';
    this.speed = 4;
    this.jumpPower = -12;
    this.friction = 0.85;
    
    // Iniciar la máquina de estados
    this.currentState = null;
    this.changeState(new IdleState());
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.exit(this);
    }
    
    this.currentState = newState;
    this.currentState.enter(this);
  }

  handleInput(inputMapper) {
    // Delegar los inputs al estado actual
    if (this.currentState) {
      this.currentState.handleInput(this, inputMapper);
    }
  }

  update(deltaTime, tilemap) {
    // 1. Aplicar físicas básicas y colisiones
    super.update(deltaTime, tilemap);
    
    // 2. Permitir que el estado actual ejecute su lógica por frame (como checar si aterrizamos)
    if (this.currentState) {
      this.currentState.update(this, deltaTime, tilemap);
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
