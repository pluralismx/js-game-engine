import State from '../../../core/State.js';
import WalkState from './WalkState.js';
import JumpState from './JumpState.js';

export default class IdleState extends State {
  enter(player) {
    console.log("Entrando a IdleState..."); // <-- Test 1
    
    // Comenta esto temporalmente por si está causando un error oculto
    // player.setVelocityX(0); 
    
    player.animator.play('idle');
    console.log("¡Se le dio play al Animator!"); // <-- Test 2
  }

  handleInput(player, inputMapper) {
    // 1. ¿El jugador quiere saltar?
    if (inputMapper.wasActionPressed("jump")) {
      player.changeState(new JumpState());
      return; 
    }

    // 2. ¿El jugador quiere moverse?
    if (inputMapper.isActionHeld("moveLeft") || inputMapper.isActionHeld("moveRight")) {
      player.changeState(new WalkState());
      return; 
    }
  }
}
