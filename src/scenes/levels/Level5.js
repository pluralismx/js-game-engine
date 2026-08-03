import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level5Data } from '../../world/maps/level5Data.js';

export default class Level5 extends Scene {
  constructor() {
    super("#d1ecf1");
    this.tilemap = new Tilemap(level5Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}