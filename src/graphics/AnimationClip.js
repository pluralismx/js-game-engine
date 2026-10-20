export default class AnimationClip {
    // 1. Recibimos los datos
    constructor(name, frames, isLooping = false) {
        this.name = name;
        this.frames = frames;
        
        // 2. OJO: Tu Animator.js evalúa "this.currentClip.isLooping", no "loop"
        this.isLooping = isLooping;
    }
}