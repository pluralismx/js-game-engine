import BoundingBox from './BoundingBox.js';

export default class CollisionBox extends BoundingBox {
  constructor(offsetX, offsetY, width, height) {
    super(offsetX, offsetY, width, height);
  }

  drawDebug(ctx) {
    // La dibujamos en blanco para distinguirla del suelo y los ataques
    super.drawDebug(ctx, 'rgba(255, 255, 255, 0.8)');
  }
}