export default class AnimationFrame {
    // 1. Recibimos los datos en los paréntesis
    constructor(x, y, width, height, duration) {
        // 2. Empaquetamos X, Y, ancho y alto en sourceRect (como lo pide tu Animator)
        this.sourceRect = { x, y, width, height };
        
        // 3. Guardamos la duración
        this.duration = duration;
    }
}