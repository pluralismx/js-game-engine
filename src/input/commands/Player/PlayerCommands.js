import Command from '../Command.js';

export class MoveLeftCommand extends Command {
  execute(actor) {
    actor.setVelocityX(-(actor.speed ?? 4));
  }
}

export class MoveRightCommand extends Command {
  execute(actor) {
    actor.setVelocityX(actor.speed ?? 4);
  }
}

export class JumpCommand extends Command {
  execute(actor) {
    // Si la entidad soporta la comprobación de estar en el suelo, la usamos.
    // De lo contrario, lo dejamos saltar libremente como fallback.
    if (actor.isOnGround !== false) {
      actor.setVelocityY(actor.jumpPower ?? -12);
    }
  }
}