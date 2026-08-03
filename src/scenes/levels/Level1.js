import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level1Data } from '../../world/maps/level1Data.js';

export default class Level1 extends Scene {
  constructor() {
    super("#87CEEB");

    this.tilemap = new Tilemap(level1Data);

    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}