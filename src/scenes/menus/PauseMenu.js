import UI from "../../core/UI.js";

export default class PauseMenu extends UI {
  constructor(world, inputMapper) {
    super(["Resume", "Quit"]);
    this.world = world;
    this.inputMapper = inputMapper;
  }

  accept() {
    const option = this.getSelectedOption();

    if (option === "Resume") {
      this.world.paused = false;
      this.world.overlayUI = null;
      this.inputMapper.setContext("player");
    } else if (option === "Quit") {
      window.location.reload();
    }
  }
}
