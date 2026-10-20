import { GAME_CONFIG } from "./config.js";
import Level1 from "../scenes/levels/Level1.js";
import InputHandler from "../input/InputHandler.js";
import InputMapper from "../input/InputMapper.js";

export default class Engine {

  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentScene = null;
    this.inputHandler = new InputHandler();
    this.inputMapper = new InputMapper(this.inputHandler);
  }

  async boot() {
    this.createCanvas(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    await this.loadInitialScene();
    this.start();
  }

  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = "#222";
    this.canvas.style.display = "block";
    this.canvas.style.margin = "0 auto";
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#111";
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

  }

  async loadInitialScene() {
    const level1 = new Level1();
    this.setScene(level1);

    if (this.currentScene.preload) {
      await this.currentScene.preload();
    }

    if (this.currentScene.create) {
      this.currentScene.create();
    }
  }

  setScene(scene) {
    this.currentScene = scene;
  }

  processInput() {
    if (this.currentScene?.handleInput) {
      this.currentScene.handleInput(this.inputMapper);
    }
  }

  update(deltaTime) {
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.currentScene) {
      this.currentScene.render(this.ctx);
    }
  }

  start() {
    let lastFrameTime = performance.now();

    const loop = (now) => {
      const deltaTime = now - lastFrameTime;
      lastFrameTime = now;

      this.inputHandler.update(deltaTime);
      this.processInput(deltaTime);
      this.update(deltaTime);
      this.render();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }


}
