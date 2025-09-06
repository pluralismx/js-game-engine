export default class InputHandler {
  constructor() {
    this.currentKeys = new Set();

    window.addEventListener("keydown", (e) => {
      this.currentKeys.add(e.code);
    });

    window.addEventListener("keyup", (e) => {
      this.currentKeys.delete(e.code);
    });
  }

  update(deltaTime) {

  }

  getPressedKeys(){
    return this.currentKeys;
  }

  getJustPressedKeys(){
    
  }

}
