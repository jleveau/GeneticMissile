/**
 * Created by Julien on 05/12/2016.
 */
function Target(x,y,radius){
    this.pos = createVector(x,y);
    this.radius = radius;

    this.draw = function(){
        ellipse(this.pos.x, this.pos.y, this.radius/2, this.radius/2);
    }
}