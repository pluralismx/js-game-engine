import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level3Data } from '../../world/maps/level3Data.js';

export default class Level3 extends Scene {
  constructor() {
    super("#fff9c4");
    this.tilemap = new Tilemap(level3Data);
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}