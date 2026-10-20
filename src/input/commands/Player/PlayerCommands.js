import Command from '../Command.js';

export class MoveLeftCommand extends Command {
  execute(actor) {
    actor.setVelocityX(-(actor.speed ?? 4));
    actor.isFacingRight = false;
  }
}

export class MoveRightCommand extends Command {
  execute(actor) {
    actor.setVelocityX(actor.speed ?? 4);
    actor.isFacingRight = true;
  }
}

export class JumpCommand extends Command {
  execute(actor) {
    if (actor.isOnGround !== false) {
      actor.setVelocityY(actor.jumpPower ?? -12);
    }
  }
}