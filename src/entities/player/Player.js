import Entity from '../../core/Entity.js';
import IdleState from './states/IdleState.js';
import { PLAYER_ANIMATIONS } from './PlayerAnimations.js';
import { assets } from '../../graphics/AssetManager.js';
import Animator from '../../graphics/Animator.js';
import CollisionBox from '../../physics/CollisionBox.js';

export default class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.color = 'blue';
    this.speed = 2;
    this.jumpPower = -12;
    this.friction = 0.85;
    
    // Es importante definir el ancho y alto real de tu personaje para el canvas
    this.width = 128;  
    this.height = 128;

    // Configurar las cajas de colisión
    this.collisionBox = new CollisionBox(48, 48, 32, 80);

    // Configurar las animaciones y la imagen
    this.isFacingRight = true;
    this.spriteSheet = assets.getImage('player_sheet');
    this.animator = new Animator();
    this.setupAnimations();

    // Iniciar la máquina de estados
    this.currentState = null;
    this.changeState(new IdleState());
  }

  setupAnimations() {
    console.log("--- RADIOGRAFÍA DE ANIMACIONES ---");
    console.log("PLAYER_ANIMATIONS importado:", PLAYER_ANIMATIONS);
    
    this.animator.addClip('idle', PLAYER_ANIMATIONS.IDLE);
    this.animator.addClip('walk', PLAYER_ANIMATIONS.WALK);
    this.animator.addClip('jump_rise', PLAYER_ANIMATIONS.JUMP_RISE);
    this.animator.addClip('fall', PLAYER_ANIMATIONS.FALL);
    this.animator.addClip('land', PLAYER_ANIMATIONS.LAND);
    
    console.log("Clips guardados en el Animator:", this.animator.clips);
    console.log("----------------------------------");
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
    super.update(deltaTime, tilemap);
    
    if (this.currentState) {
      this.currentState.update(this, deltaTime, tilemap);
    }
    
    this.animator.update(deltaTime);
  }

  render(ctx) {
    this.animator.render(
      ctx,
      this.spriteSheet,
      this.x,
      this.y,
      this.width,
      this.height,
      this.isFacingRight
    );
    // if (this.collisionBox) {
    //   this.collisionBox.drawDebug(ctx);
    // }
  }
}
