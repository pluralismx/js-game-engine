import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level7Data } from '../../world/maps/level7Data.js';
import { assets } from '../../graphics/AssetManager.js';
import DeadzoneCamera from '../../graphics/Camera/DeadzoneCamera.js';

export default class Level7 extends Scene {
  constructor() {
    super("#e6ccff");
    const mapPixelWidth = level7Data.width * level7Data.tileSize;
    const mapPixelHeight = level7Data.height * level7Data.tileSize;
    this.camera = new DeadzoneCamera(mapPixelWidth, mapPixelHeight);
    this.player = null;
    this.monster = null;
  }

  async preload() {
    await assets.queueImage('player_sheet', './src/entities/player/sprites/frodo_sprite_sheet.png');
    await assets.loadAll();
  }

  async create() {
    this.tilemap = new Tilemap(level7Data);
    
    this.player = new Player(100, 100);
    this.monster = new Monster(400, 100);

    this.addEntity(this.player, true); 
    this.addEntity(this.monster);
  }
}