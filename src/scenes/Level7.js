import World from '../core/World.js';
import Player from '../entities/player/Player.js';
import Monster from "../entities/enemies/Monster.js";

export default class Level7 extends World {
  constructor() {
    super("#e6ccff");
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}