import Engine from "./src/core/Engine.js";

export default class App {
  constructor() {
    this.engine = new Engine();
  }

  load(){
    console.log("La aplicación ha sido cargada");
    this.engine.boot();
  }
}