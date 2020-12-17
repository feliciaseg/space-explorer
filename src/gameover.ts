class GameOver {
  private gameGUI: IGameState;
  private isActive: boolean;
  private button: p5.Element;

  constructor(gameGUI: GameGUI) {
    this.gameGUI = gameGUI;
    this.isActive = false;
    this.button = createButton("Go to Intro GUI");
  }

  public draw() {
    if (!this.isActive) {
      this.createElements();
      this.isActive = true;
    }
    this.button.mousePressed(() => {
      this.isActive = false;
      this.button.hide();
      this.gameGUI.updateGUI("intro");
    });
  }

  createElements() {
    // CREATE CANVAS
    createCanvas(windowWidth, windowHeight);
    background(random(30));
    // CREATE TEXT
    fill("white");
    textSize(30);
    text("This is the GameOver GUI", 100, 100);
    //CREATE BUTTON
    this.button.show();
    this.button.size(150, 30);
    this.button.position(100, height / 2);
  }
}