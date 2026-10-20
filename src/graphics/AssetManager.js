class AssetManager {
    constructor() {
      this.images = new Map();
      this.downloadQueue = [];
    }
  
    queueImage(key, url) {
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.images.set(key, img);
          resolve();
        };
        img.onerror = () => reject(new Error(`[AssetManager] Error al cargar: ${url}`));
        img.src = url;
      });
  
      this.downloadQueue.push(promise);
    }
  
    async loadAll() {
      await Promise.all(this.downloadQueue);
      this.downloadQueue = [];
    }
  
    getImage(key) {
      return this.images.get(key);
    }
  }
  
  export const assets = new AssetManager();