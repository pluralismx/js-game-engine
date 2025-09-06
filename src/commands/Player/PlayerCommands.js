import Command from '../Command.js';


export class MoveLeftCommand extends Command {
  execute(actor) {
    actor.updateX(-(actor.speed ?? 2));
  }
}

export class MoveRightCommand extends Command {
  execute(actor) {
    actor.updateX(actor.speed ?? 2);
  }
}

export class JumpCommand extends Command {
  execute(actor) {
    actor.updateY(-(actor.jumpPower ?? 20));
  }
}