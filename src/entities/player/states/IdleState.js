import State from '../../../core/State.js';
import WalkState from './WalkState.js';
import JumpState from './JumpState.js';

export default class IdleState extends State {
  enter(player) {
    // Cuando entramos en reposo, nos aseguramos de que no haya velocidad residual
    player.setVelocityX(0); 
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
