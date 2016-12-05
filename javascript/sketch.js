var DIM_X = 600;
var DIM_Y = 400;
var ROCKET_WIDTH = 10;
var ROCKET_HEIGHT = 30;
var NB_ROCKET = 200;
var TARGET_RADIUS = 50;
var POPULATION_LIFESPAN = 600;
var MUTATION_RATE = 0.005;

var population;
var target;
var lifeP;
var generationP;
var reached = 0;
var reachedP;
var obstacles = [];

function createPopulation(){
    return new RocketPopulation(NB_ROCKET, createVector(DIM_X/2, DIM_Y - ROCKET_HEIGHT - 10) , ROCKET_WIDTH, ROCKET_HEIGHT, POPULATION_LIFESPAN, MUTATION_RATE);
}

function createObstacles(){
    obstacles.push(new Obstacle(DIM_X/4, DIM_Y/2, DIM_X/2, 10));
}

function setup(){
    lifeP = createP('');
    generationP = createP('');
    reachedP = createP('');

    createCanvas(DIM_X, DIM_Y);
    createObstacles();
    population = createPopulation();
    target = new Target(DIM_X/2, DIM_Y/8, TARGET_RADIUS);
}

function draw(){
    background(0);
    lifeP.html("frame : " + population.lifecount);
    generationP.html("generation : " + population.generation);
    reachedP.html('reached : ' + reached);

    population.update(target, obstacles);


    target.draw();
    for (obstacle of obstacles)
        obstacle.draw();
    population.draw();

}