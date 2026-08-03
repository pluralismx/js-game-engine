import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level7Data } from '../../world/maps/level7Data.js';

export default class Level7 extends Scene {
  constructor() {
    super("#e6ccff");
    this.tilemap = new Tilemap(level7Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}