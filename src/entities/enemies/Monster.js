import Entity from '../../core/Entity.js';

export default class Monster extends Entity {
  constructor(x, y) {
    super(x, y);
    this.width = 32;
    this.height = 32;
    this.color = 'red';
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}