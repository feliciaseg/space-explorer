class GamePlay {
  // Skapa interface så att player får tillgång till shots<>
  private gameGUI: IGameState;
  private player: Player;
  private isActive: boolean;
  private gameObjects: Array<GameObject>;
  private stars: Array<Star>;
  public shots: Array<Shot>;
  private statusBar: StatusBar;

  constructor(gameGUI: IGameState) {
    this.gameGUI = gameGUI;
    this.isActive = false;
    this.gameObjects = [];
    this.stars = [];
    this.player = new Player();
    this.shots = this.player.shots;
    this.statusBar = new StatusBar();
  }

  public update() {
    this.statusBar.update();
    this.player.update();
    this.updateGameObjects();
  }

  public draw() {
    // GUI SETUP
    if (this.isActive === false) {
      this.createGameObjects();
      this.isActive = true;
    }

    this.player.draw();
    this.drawGameObjects();
    this.updateCollisionCount();

    // DRAW STATUSBAR
    this.statusBar.draw();
  }

  private updateCollisionCount() {
    push();
    textSize(50);
    fill("white");
    text(String(this.player.currentHealth), width - 100, 120);
    pop();
  }

  /** Change gui to Game Over */
  private changeGui = () => {
    this.gameGUI.updateGUI("over");
  };

  /** Create all game object instances */
  private createGameObjects() {
    for (let i = 0; i < 1000; i++) {
      this.stars.push(new Star());
    }
    for (let i = 0; i < 5; i++) {
      //8 st
      this.gameObjects.push(new Planet());
    }
    for (let i = 0; i < 5; i++) {
      this.gameObjects.push(new SpaceDiamond());
    }
    for (let i = 0; i < 3; i++) {
      //3 st
      this.gameObjects.push(new Meteorite());
    }
    for (let i = 0; i < 2; i++) {
      this.gameObjects.push(new BlackHole());
    }
  }

  /** Call draw() on all gameObjects */
  private drawGameObjects() {
    for (let gameObject of this.gameObjects) {
      gameObject.draw();
    }
    for (let star of this.stars) {
      star.draw();
    }
  }

  /** Call update() on all gameObjects */
  private updateGameObjects() {
    for (let gameObject of this.gameObjects) {
      gameObject.update();
      this.checkCollision(this.player, gameObject);
    }
    for (let star of this.stars) {
      star.update();
    }
    if (this.shots.length) {
      this.checkShotHit(this.shots, this.gameObjects);
    }
  }

  /* private getValidYPos() {
    const yPositions = this.gameObjects.map(
      (gameObject) => gameObject.position.y
    );
    // const yPos = [0, 8, 50, 200, 230];

    const indexStart = floor(random(yPositions.length - 1));
    const indexEnd = indexStart + 1;

    const validYPos = random(
      yPositions[indexStart] + 25 * 2,
      yPositions[indexEnd] - 25 * 2
    );
    return validYPos;
  } */

  private checkShotHit(shots: Array<Shot>, objs: Array<GameObject>) {
    for (let j = 0; j < objs.length; j++)
      for (let i = 0; i < shots.length; i++) {
        if (shots[i].hits(objs[j]) && !objs[j].isHit) {
          if (objs[j] instanceof BlackHole) {
            objs[j].isHit = true;
            shots.splice(i, 1);
          } else {
            console.log("hit");
            objs[j].isHit = true;
            objs.splice(j, 1);
            shots.splice(i, 1);
          }
        }
      }
  }

  private checkCollision(p: Player, obj: GameObject) {
    let distance = dist(
      p.position.x,
      p.position.y,
      obj.position.x,
      obj.position.y
    );

    if (distance < obj.radius + 40) {
      if (!obj.isHit) {
        this.handleCollision(p, obj);
        obj.isHit = true; // Make sure the object knows it has been hit after first intersection
      }
    } else {
      obj.isHit = false;
    }
  }

  private handleCollision(p: Player, obj: GameObject) {
    this.player.currentHealth = this.updateHealth(p.currentHealth, obj);
    // Then do something to the object that has been hit, e.g explode and play sound
  }

  private updateHealth(health: number, obj: GameObject) {
    if (obj.damage < 0) {
      obj.position.x = 0;
      obj.update();
    }

    health = this.player.currentHealth - obj.damage;
    if (health <= 0) {
      this.player.die();
    }
    return health;
  }
}
