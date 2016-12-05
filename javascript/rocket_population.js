/**
 * Created by Julien on 05/12/2016.
 */
function RocketPopulation(n, startPosVector, width, height, lifespan){
    this.population = n;
    this.rockets = [];

    this.lifespan = lifespan;
    this.lifecount = 0;
    this.generation = 0;

    this.finished = false;
    this.matingpool = [];


    for (var i = 0; i < this.population; ++i){
        this.rockets.push(new Rocket(startPosVector.x, startPosVector.y, width, height, this.lifespan));
    }

    this.updateLifeCount = function(){

        if (this.lifecount <  this.lifespan -1 )
            this.lifecount ++;
        else
            this.finished = true;
    };


    this.update = function(target, obstacles){
        var cpt = 0;
        if (!this.finished) {
            for (rocket of this.rockets) {
                if (rocket.crashed || rocket.finished)
                    ++cpt;
                rocket.update(this.lifecount, target, obstacles);
            }
            if (cpt == this.rockets.length){
                this.evaluate(target);
            }

            this.updateLifeCount();
        }
        else
            this.evaluate(target);
    };

    this.draw = function(){
        for (rocket of this.rockets){
            rocket.draw();
        }
    };

    this.evaluate = function(target){
        reached = 0;
        var max = 0;
        for (var rocket of this.rockets){
            rocket.evaluate(target);
            rocket.reset();

            max = Math.max(max, rocket.fitness);
        }
        //normalize fitness of the rockets
        for (rocket of this.rockets){
            rocket.fitness /= max;
        }

        this.matingpool = [];
        for (rocket of this.rockets){
            var n = rocket.fitness * 100;
            for (var j = 0; j < n; ++j){
                this.matingpool.push(rocket);
            }
        }
        this.selection();
    };

    this.selection = function(){
        var new_rockets = [];
        for (var rocket of this.rockets){
            //XXX very bad random
            var index = floor(random(this.matingpool.length));
            var parent_1 = this.matingpool[index];
            this.matingpool.splice(index,1);
            var parent_2 = random(this.matingpool);
            var dna = parent_1.dna.crossover(parent_2.dna);
            new_rockets.push( new Rocket(rocket.pos.x, rocket.pos.y, rocket.width, rocket.height, this.lifespan, dna));
        }
        this.rockets = new_rockets;
        this.lifecount = 0;
        this.finished = false;
        ++this.generation;
    }

}