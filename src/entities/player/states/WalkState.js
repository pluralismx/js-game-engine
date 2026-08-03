import State from "../../../core/State.js";
import IdleState from "./IdleState.js";
import JumpState from "./JumpState.js";
import { MoveLeftCommand, MoveRightCommand } from "../../../input/commands/Player/PlayerCommands.js";

export default class WalkState extends State {
  handleInput(player, inputMapper) {
    let isMoving = false;

    // Ejecutamos movimiento si las teclas están presionadas
    if (inputMapper.isActionHeld("moveLeft")) {
      new MoveLeftCommand().execute(player);
      isMoving = true;
    } 
    
    if (inputMapper.isActionHeld("moveRight")) {
      new MoveRightCommand().execute(player);
      isMoving = true;
    }

    // Si salta mientras camina, cambiamos a salto
    if (inputMapper.wasActionPressed("jump")) {
      player.changeState(new JumpState());
      return;
    }

    // Si soltó ambas teclas de dirección, regresamos a inactivo
    if (!isMoving) {
      player.changeState(new IdleState());
    }
  }
}
