export default class InputHandler {
  constructor() {
    this.currentKeys = new Set();
    this.previousKeys = new Set();
    this.justPressedKeys = new Set();

    window.addEventListener("keydown", (e) => {
      this.currentKeys.add(e.code);
    });

    window.addEventListener("keyup", (e) => {
      this.currentKeys.delete(e.code);
    });
  }

  update(deltaTime) {
    this.justPressedKeys.clear();

    for (const key of this.currentKeys) {
      if (!this.previousKeys.has(key)) {
        this.justPressedKeys.add(key);
      }
    }
    this.previousKeys = new Set(this.currentKeys);
  }

  getPressedKeys() {
    return this.currentKeys;
  }

  getJustPressedKeys() {
    return this.justPressedKeys;
  }
}