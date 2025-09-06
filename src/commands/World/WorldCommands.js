import PauseMenu from "../../scenes/PauseMenu.js";
import Command from "../Command.js";

export class PauseGameCommand extends Command {
  execute(world) {
    if (!world.paused) {
      world.paused = true;
      world.overlayUI = new PauseMenu(world);
      console.log("PauseMenu set:");
    }
  }
}
