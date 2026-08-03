import { playerBindings, menuBindings, sceneBindings } from "./bindings.js";

export default class InputMapper {
  constructor(inputHandler) {
    this.inputHandler = inputHandler;
    this.context = "player";
    this.bindingsByContext = {
      player: playerBindings,
      menu: menuBindings,
    };
  }

  setContext(context) {
    this.context = context;
  }

  getActiveBindings() {
    return this.bindingsByContext[this.context];
  }

  isActionHeld(action) {
    const binding = this.getActiveBindings()[action];
    if (!binding || binding.type !== "held") return false;
    return binding.keys.some(key =>
      this.inputHandler.getPressedKeys().has(key)
    );
  }

  wasActionPressed(action) {
    // Buscar primero en los bindings globales de la escena
    const globalBinding = sceneBindings[action];
    if (globalBinding && globalBinding.type === "pressed") {
      if (globalBinding.keys.some(key => this.inputHandler.getJustPressedKeys().has(key))) {
        return true;
      }
    }

    // Luego buscar en los bindings del contexto activo
    const binding = this.getActiveBindings()[action];
    if (!binding || binding.type !== "pressed") return false;
    return binding.keys.some(key =>
      this.inputHandler.getJustPressedKeys().has(key)
    );
  }
}