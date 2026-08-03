import PauseMenu from "../../../scenes/menus/PauseMenu.js";
import Command from "../Command.js";

export class PauseGameCommand extends Command {
  execute(world, inputMapper) {
    if (!world.paused) {
      world.paused = true;
      world.overlayUI = new PauseMenu(world, inputMapper);
      inputMapper.setContext("menu");
    }
  }
}
