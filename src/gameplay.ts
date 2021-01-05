
class GamePlay {
  private gameGUI: IGameState;
  private player: Player;
  private isActive: boolean;
  public button: p5.Element;
  private gameObjects: Array<GameObject>;
  private collisionCount: number;
  private shots: Array<Shot>;

  constructor(gameGUI: IGameState) {
    this.gameGUI = gameGUI;
    this.isActive = false;
    this.button = createButton("Go to GameOver GUI");
    this.gameObjects = [];
    this.player = new Player();
    this.collisionCount = 0;
    this.shots = [];

  }

  public update() {
    this.player.update();
    this.updateGameObjects();
    this.button.mousePressed(this.changeGui);
    this.shoot();
  }

  public draw() {
    // GUI SETUP
    if (this.isActive === false) {
      this.createGameObjects();
      this.isActive = true;
    }

    this.createGuiButtonAndText(); // NEEDS TO BE DRAWN ALL THE TIME
    this.player.draw();
    this.drawGameObjects();
    this.drawCollisionCount();

      if (this.shots) {
        for (let i = 0; i < this.shots.length; i++) {
        this.shots[i].draw();
        this.shots[i].update();
        if (this.shots[i].position.x > width) {
          this.shots.splice(i, 1);
        }
      }
    }
  }

  /** Creates button and text for changing gui */
  private createGuiButtonAndText() {
    // CREATE TEXT
    fill("white");
    textSize(30);
    noStroke();
    text("This is the GamePlay GUI", 10, 40);
    // CREATE BUTTON
    this.button.show();
    this.button.size(150, 30);
    this.button.position(10, 50);
  };

   private drawCollisionCount(){
    push();
    textSize(50)
    fill("white");
    text(JSON.stringify(this.collisionCount), width-100, 90)
    pop();
  }

  /** Change gui to Game Over */
  private changeGui = () => {
    this.gameGUI.updateGUI("over");
  };

  /** Create all game object instances */
  private createGameObjects() {
    for (let i = 0; i < 1000; i++) {
      this.gameObjects.push(new Star());
    }
    for (let i = 0; i < 2; i++) { //8 st
      this.gameObjects.push(new Planet());
    }for (let i = 0; i < 2; i++) { //5 st
      this.gameObjects.push(new Spacediamond());
    }
    for (let i = 0; i < 2; i++) { //3 st
      this.gameObjects.push(new Meteorite());
    }
    for (let i = 0; i < 2; i++) { 
      this.gameObjects.push(new BlackHole());
    }
  }

  /** Call draw() on all gameObjects */
  private drawGameObjects() {
    for (let gameObject of this.gameObjects) {
      if (gameObject instanceof Star) {
        gameObject.draw();
      }
      if (gameObject instanceof Planet) {
        gameObject.draw();
      }
      if (gameObject instanceof Meteorite) {
        gameObject.draw();
      }
      if (gameObject instanceof Spacediamond) {
        gameObject.draw();
      }
      if (gameObject instanceof BlackHole) {
        gameObject.draw();
      }
    }
  }

  /** Call update() on all gameObjects */
  private updateGameObjects() {
    for (let gameObject of this.gameObjects) {
      if (gameObject instanceof Star) {
        gameObject.update();
        this.checkCollision(this.player, gameObject);
      }
      if (gameObject instanceof Planet) {
        gameObject.update();
        this.checkCollision(this.player, gameObject);
      }
      if (gameObject instanceof Meteorite) {
        gameObject.update();
        this.checkCollision(this.player, gameObject);
      }
      if (gameObject instanceof Spacediamond) {
        gameObject.update();
        this.checkCollision(this.player, gameObject);
      }
      if (gameObject instanceof BlackHole) {
        gameObject.update();
        this.checkCollision(this.player, gameObject);
      }
    } 
  }

  public checkCollision(player: Player, gameObject: GameObject) {
    let d = dist(player.position.x, player.position.y, gameObject.position.x, gameObject.position.y)
      if (d < gameObject.radius + 40) {
        this.collisionCount++;
            
          if (gameObject instanceof BlackHole){
            this.player.currentHealth = this.updateHealth(player.currentHealth, gameObject);
            gameObject.isHit = true;       
          } 

          if (gameObject instanceof Planet){
            this.player.currentHealth = this.updateHealth(player.currentHealth, gameObject);
            gameObject.isHit = true;
          }

          if (gameObject instanceof Meteorite){
            this.player.currentHealth = this.updateHealth(player.currentHealth, gameObject);
            gameObject.isHit = true;
          }

          if (gameObject instanceof Spacediamond){
            this.player.currentHealth = this.updateHealth(player.currentHealth, gameObject);
            gameObject.isHit = true;
          }
      } 
        return gameObject.isHit = false;
  }   


  private shoot() {
    if (keyIsPressed) {
      if (keyCode === 32) {
        let shot = new Shot(this.player.position.x +90, this.player.position.y+36);
        this.shots.push(shot); 
      }
    }
  }


  public updateHealth(currentHealth:number, gameObject:GameObject) {
    if (gameObject.isHit = true) {
      if (gameObject instanceof Planet){
        currentHealth = this.player.currentHealth - gameObject.damage;
       } 

       if (gameObject instanceof BlackHole){
          currentHealth = this.player.currentHealth - gameObject.damage;        
        }

        if (gameObject instanceof Meteorite){
          currentHealth = this.player.currentHealth - gameObject.damage;     
        }

        if (gameObject instanceof Spacediamond){
          currentHealth = this.player.currentHealth + gameObject.health
        }

        if(currentHealth <= 10){
          this.player.die();
        }
      } 
    return currentHealth;
  }

}
