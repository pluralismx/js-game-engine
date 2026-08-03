import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level4Data } from '../../world/maps/level4Data.js';

export default class Level4 extends Scene {
  constructor() {
    super("#d4edda");
    this.tilemap = new Tilemap(level4Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}