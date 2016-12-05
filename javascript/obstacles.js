/**
 * Created by Julien on 05/12/2016.
 */

function Obstacle(x, y, width, height){
    this.pos = createVector(x,y);

    this.width = width;
    this.height = height;

    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        rect(0,0,width, height);
        pop();
    }
}