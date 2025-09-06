import World from '../core/World.js';
import Player from '../entities/player/Player.js';
import Monster from "../entities/enemies/Monster.js";

export default class Level4 extends World {
  constructor() {
    super("#d4edda");
    const player = new Player(100, 100);
    const monster = new Monster(400, 100);

    this.addEntity(player);
    this.addEntity(monster);
  }
}