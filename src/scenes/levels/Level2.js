import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level2Data } from '../../world/maps/level2Data.js';

export default class Level2 extends Scene {
  constructor() {
    super("#ffe5b4");
    this.tilemap = new Tilemap(level2Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}