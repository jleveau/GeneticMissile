function Rocket (pos_x, pos_y, width, height, nb_frame, dna = null ){
    this.initialPos =  createVector(pos_x, pos_y);
    this.pos = this.initialPos.copy();
    this.width = width;
    this.height = height;
    this.speed = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.fitness = 0;
    this.finished = false;
    this.crashed = false;

    if (dna){
        this.dna = dna;
    }
    else
        this.dna = new DNA(nb_frame);

    this.applyForce = function (numFrame){
        this.acceleration = this.dna.getVector(numFrame);
    };

    this.update = function(numFrame, target, obstacles){
        if (! this.finished && ! this.crashed){
            if (dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) < target.radius/2){
                this.pos = target.pos.copy();
                this.finished = true;
                reached ++;
            }
            if (this.pos.x < 0 || this.pos.x > DIM_X || this.pos.y < 0 || this.pos.y > DIM_Y){
                this.crashed = true;
            }
            for (obstacle of obstacles){
                if (this.pos.x + this.width > obstacle.pos.x && this.pos.x < obstacle.pos.x + obstacle.width &&
                    this.pos.y + this.height > obstacle.pos.y && this.pos.y < obstacle.pos.y + obstacle.height){
                    this.crashed = true;
                }
            }
            this.applyForce(numFrame);
            this.speed.add(this.acceleration);
            this.pos.add(this.speed);
        }
    };

    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        rotate(this.speed.heading() + PI/2);
        fill(255,100);
        rect(0, 0, this.width, this.height);
        pop();
    };

    this.reset = function(){
        this.pos = this.initialPos.copy();
        this.speed.mult(0);
    };

    this.evaluate = function(target){
        var target_distance = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
        this.fitness =  1/target_distance;

        if (this.finished){
            this.fitness *=  10;
        }
        if (this.crashed)
            this.fitness /=  10;
    }

}