import State from '../../../core/State.js';
import IdleState from './IdleState.js';
import WalkState from './WalkState.js';
import { JumpCommand, MoveLeftCommand, MoveRightCommand } from '../../../input/commands/Player/PlayerCommands.js';

export default class JumpState extends State {
  enter(player) {
    // Iniciamos SOLO la animación de subida
    player.animator.play('jump_rise');
    new JumpCommand().execute(player);
  }

  handleInput(player, inputMapper) {
    if (inputMapper.isActionHeld("moveLeft")) {
      new MoveLeftCommand().execute(player);
    } 
    else if (inputMapper.isActionHeld("moveRight")) {
      new MoveRightCommand().execute(player);
    }
  }

  update(player, deltaTime, tilemap) {
    // Magia visual: Si empezamos a caer, cambiamos al fotograma congelado
    if (player.vy > 0) {
      // Como 'fall' es otro clip, el animator se encargará de mostrar ese fotograma
      player.animator.play('fall'); 
    }

    // Lógica de tocar el suelo
    if (player.isOnGround) {
      if (Math.abs(player.vx) < 0.1) {
        player.changeState(new IdleState());
      } else {
        player.changeState(new WalkState());
      }
    }
  }
}
