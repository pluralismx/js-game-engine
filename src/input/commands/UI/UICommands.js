import Command from "../Command.js";

export class SelectNextOptionCommand extends Command {
  execute(ui) {
    ui.selectedIndex = (ui.selectedIndex + 1) % ui.options.length;
  }
}

export class SelectPreviousOptionCommand extends Command {
  execute(ui) {
    ui.selectedIndex = (ui.selectedIndex - 1 + ui.options.length) % ui.options.length;
  }
}

export class AcceptOptionCommand extends Command {
  execute(ui) {
    ui.accept();
  }
}
