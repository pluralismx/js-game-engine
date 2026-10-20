// components/Animator.js

export default class Animator {
    
  constructor() {
      this.clips = new Map(); 
      this.currentClip = null;
      this.currentFrameIndex = 0;
      this.elapsedTime = 0;
      this.isPlaying = false;
    }

    render(ctx, image, x, y, width, height, isFacingRight = true) {
      const rect = this.currentFrameRect;
      if (!rect || !image) return;
  
      ctx.save();
  
      if (!isFacingRight) {
        // Invertimos el lienzo únicamente para este sprite
        ctx.translate(x + width, y);
        ctx.scale(-1, 1);
        ctx.drawImage(
          image,
          rect.x, rect.y, rect.width, rect.height,
          0, 0, width, height
        );
      } else {
        // Dibujo normal a la derecha
        ctx.drawImage(
          image,
          rect.x, rect.y, rect.width, rect.height,
          x, y, width, height
        );
      }
  
      ctx.restore();
    }
  
    addClip(key, clip) {
      this.clips.set(key, clip);
    }
  
    play(key, forceReset = false) {
      const clip = this.clips.get(key);
      
      if (!clip) {
        console.warn(`[Animator] Animación no encontrada: ${key}`);
        return;
      }
  
      if (this.currentClip === clip && !forceReset) return;
  
      this.currentClip = clip;
      this.currentFrameIndex = 0;
      this.elapsedTime = 0;
      this.isPlaying = true;
    }
  
    update(deltaTime) {
      if (!this.isPlaying || !this.currentClip || this.currentClip.frames.length === 0) {
        return;
      }
  
      this.elapsedTime += deltaTime;
      const currentFrameDuration = this.currentClip.frames[this.currentFrameIndex].duration;
  
      if (this.elapsedTime >= currentFrameDuration) {
        this.elapsedTime -= currentFrameDuration; 
        
        this.currentFrameIndex++;
  
        if (this.currentFrameIndex >= this.currentClip.frames.length) {
          if (this.currentClip.isLooping) {
            this.currentFrameIndex = 0; 
          } else {
            this.currentFrameIndex = this.currentClip.frames.length - 1;
            this.isPlaying = false; 
          }
        }
      }
    }
  
    get currentFrameRect() {
      if (!this.currentClip || this.currentClip.frames.length === 0) {
        return null;
      }
      return this.currentClip.frames[this.currentFrameIndex].sourceRect;
    }
  }