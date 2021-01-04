class Spacediamond extends GameObject {
    // private collisionSound: string - To be added later
    

    constructor(){
        super()
        // this.collisionSound = "" To be added later
        this.position = createVector(random(width), random(height))
        this.velocity = createVector(3, 0)
        this.acceleration = createVector(0,0)
        this.radius = 5;
    }

    public update(){
        this.position.sub(this.velocity)
        if (this.position.x < 0){
            this.position.x = width
            this.position.y = random(height) 
        }   
    }

    public draw(){
        push();
        fill(color("yellow"));
        ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
        pop();
    }
}


