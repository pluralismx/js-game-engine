import AnimationClip from '../../graphics/AnimationClip.js';
import AnimationFrame from '../../graphics/AnimationFrame.js';

const SIZE = 128; 

export const PLAYER_ANIMATIONS = {
    // Animación de respirar: Está en la SEGUNDA fila de tu dibujo (Y = 128)
    IDLE: new AnimationClip('idle', [
      new AnimationFrame(0, 128, SIZE, SIZE, 400),     // Fotograma 1
      new AnimationFrame(128, 128, SIZE, SIZE, 400)    // Fotograma 2
    ], true),
  
    // Ciclo de caminado: Está en la PRIMERA fila de tu dibujo (Y = 0)
    WALK: new AnimationClip('walk', [
      new AnimationFrame(0, 0, SIZE, SIZE, 100),   // Fotograma 1 (¡Baja la duración a 100 para que corra fluido!)
      new AnimationFrame(128, 0, SIZE, SIZE, 100), // Fotograma 2
      new AnimationFrame(256, 0, SIZE, SIZE, 100), // Fotograma 3
      new AnimationFrame(384, 0, SIZE, SIZE, 100), // Fotograma 4
      new AnimationFrame(512, 0, SIZE, SIZE, 100), // Fotograma 5
      new AnimationFrame(640, 0, SIZE, SIZE, 100), // Fotograma 6
      new AnimationFrame(768, 0, SIZE, SIZE, 100), // Fotograma 7
      new AnimationFrame(896, 0, SIZE, SIZE, 100), // Fotograma 8
      new AnimationFrame(1024, 0, SIZE, SIZE, 100) // Fotograma 9
    ], true),

    // 1. Fase de despegue y subida (¡Loop en FALSE para que se detenga al final!)
    JUMP_RISE: new AnimationClip('jump_rise', [
      new AnimationFrame(0, 256, SIZE, SIZE, 50),   // Agachándose
      new AnimationFrame(128, 256, SIZE, SIZE, 70), // Empuje
      new AnimationFrame(256, 256, SIZE, SIZE, 70), // Subiendo
      new AnimationFrame(384, 256, SIZE, SIZE, 70), // Cúspide (brazos arriba)
    ], false), // <-- IMPORTANTE: false para que no se repita

    // 2. Fase de caída (Se queda congelado en este frame mientras esté en el aire)
    FALL: new AnimationClip('fall', [
      new AnimationFrame(512, 256, SIZE, SIZE, 50), // Cayendo (brazos abajo)
    ], true), // Puede ser true porque es un solo fotograma

    // 3. Fase de aterrizaje (Para cuando toque el suelo)
    LAND: new AnimationClip('land', [
      new AnimationFrame(640, 256, SIZE, SIZE, 100), // Impacto
      new AnimationFrame(768, 256, SIZE, SIZE, 100), // Recuperación
    ], false),
  };