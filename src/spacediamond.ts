class Spacediamond extends GameObject {
  // private collisionSound: string - To be added later
  color: p5.Color;

  constructor() {
    super();
    // this.collisionSound = "" To be added later
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(3, 0);
    // this.acceleration = createVector(0, 0);
    this.color = color("yellow");
  }

  public update() {
    this.position.sub(this.velocity);
    if (this.position.x < 0) {
      this.position.x = width;
      this.position.y = random(height);
    }
  }

  public draw() {
    push();
    fill(this.color);
    ellipse(this.position.x, this.position.y, 10, 10);
    pop();
  }
}
