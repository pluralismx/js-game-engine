import UI from "../core/UI.js";

export default class PauseMenu extends UI {
  constructor(world) {
    super(["Resume", "Quit"]);
    this.world = world;
  }

  accept() {
    const option = this.getSelectedOption();

    if (option === "Resume") {
      this.world.paused = false;
      this.world.overlayUI = null;
    } else if (option === "Quit") {
      window.location.reload();
    }
  }
}
