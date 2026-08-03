import State from '../../../core/State.js';
import IdleState from './IdleState.js';
import WalkState from './WalkState.js';
import { JumpCommand, MoveLeftCommand, MoveRightCommand } from '../../../input/commands/Player/PlayerCommands.js';

export default class JumpState extends State {
  enter(player) {
    // Al entrar al estado, ejecutamos el salto
    new JumpCommand().execute(player);
  }

  handleInput(player, inputMapper) {
    // Control en el aire
    if (inputMapper.isActionHeld("moveLeft")) {
      new MoveLeftCommand().execute(player);
    } 
    else if (inputMapper.isActionHeld("moveRight")) {
      new MoveRightCommand().execute(player);
    }
  }

  update(player, deltaTime, tilemap) {
    // Si tocamos el suelo, decidimos a qué estado pasar
    if (player.isOnGround) {
      // Si casi no tenemos velocidad horizontal, volvemos a Idle
      if (Math.abs(player.vx) < 0.1) {
        player.changeState(new IdleState());
      } else {
        // Si seguimos moviéndonos al aterrizar, pasamos a Walk
        player.changeState(new WalkState());
      }
    }
  }
}
