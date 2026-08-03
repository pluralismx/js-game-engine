import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level6Data } from '../../world/maps/level6Data.js';

export default class Level6 extends Scene {
  constructor() {
    super("#fce4ec");
    this.tilemap = new Tilemap(level6Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}