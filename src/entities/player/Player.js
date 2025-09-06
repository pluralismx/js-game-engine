import Entity from '../../core/Entity.js';
import {
  JumpCommand,
  MoveLeftCommand,
  MoveRightCommand,
} from "../../commands/Player/PlayerCommands.js";

export default class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.width = 32;
    this.height = 32;
    this.color = 'blue';
    this.speed = 2;
    this.jumpPower = 20;

    // Mapeo de teclas físicas a comandos
    this.keyCommandMap = {
      KeyA: new MoveLeftCommand(),
      KeyD: new MoveRightCommand(),
      Space: new JumpCommand(),
    };
  }

  handleInput(inputHandler) {
    for (const key of inputHandler.getPressedKeys()) {
      const command = this.keyCommandMap[key];
      if (command) {
        command.execute(this);
      }
    }
  }

  update(deltaTime) {
    // lógica adicional si se necesita (gravedad, animaciones, etc.)
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
