export default class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  setX(x) {
    this.x = Math.max(0, x);
  }

  setY(y) {
    this.y = y;
  }

  updateX(dx = 1) {
    this.setX(this.x + dx);
  }

  updateY(dy = 1) {
    this.y += dy;
  }

  setPosition(x, y) {
    this.setX(x);
    this.setY(y);
  }

  update() {

  }

  render(ctx) {

  }
}
