// scenes/Level1.js
import Scene from '../../core/Scene.js';
import Player from '../../entities/player/Player.js';
import Monster from "../../entities/enemies/Monster.js";
import { Tilemap } from '../../world/Tilemap.js';
import { level1Data } from '../../world/maps/level1Data.js';
import { assets } from '../../graphics/AssetManager.js';
import DeadzoneCamera from '../../graphics/camera/DeadzoneCamera.js';

export default class Level1 extends Scene {
  constructor() {
    super("#87CEEB");
    
    // Declaración explícita de propiedades para legibilidad y optimización (V8 Engine)
    this.player = null;
    this.monster = null;
  }

  async preload() {
    await assets.queueImage('player_sheet', './src/entities/player/sprites/frodo_sprite_sheet.png');
    await assets.loadAll();
  }

  async create() {
    // 1. Crear el mundo
    this.tilemap = new Tilemap(level1Data);

    // 2. Instanciar entidades
    this.player = new Player(100, 100);
    // this.monster = new Monster(400, 100);

    // 3. Agregarlas al ciclo de la escena
    this.addEntity(this.player, true);
    // this.addEntity(this.monster);

    // 4. Crear y configurar la cámara
    const mapPixelWidth = level1Data.width * level1Data.tileSize;
    const mapPixelHeight = level1Data.height * level1Data.tileSize;
    const camera = new DeadzoneCamera(mapPixelWidth, mapPixelHeight);
    
    // Delegamos la cámara a la clase padre Scene
    this.setupCamera(camera, this.player); 
  }
}