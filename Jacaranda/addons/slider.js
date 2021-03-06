// Cameron Harris's Slider writen by Tegan Bristow into this slider object
// Simple vertical slider


var Slider = function(fx, fy, t1, t2, t3, t4) {
  this.sliderWidth = 60;
  this.sliderHeight = 200;
  this.textS = 13;
  this.tbSpace = 40;
  this.triY = fy+this.sliderHeight-(this.tbSpace+20);
  this.inter = false;
  this.x = fx;
  this.y = fy;
  this.ty = this.x + this.tbSpace*1.5; // should set this via loading for defualt position with in new instance
  this.tfillCol = '#fff';

  this.display = function(){
  //base rect
  strokeWeight(1);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  stroke(160, 50);
  fill(160, 50);
  rect(this.x, this.y-this.tbSpace, this.sliderWidth, this.sliderHeight);
  //vertical line
  strokeWeight(3);
  stroke(255);
  line(this.x+this.sliderWidth/2, this.y, this.x+this.sliderWidth/2, this.y+this.sliderHeight-(this.tbSpace*1.5));
  //label
  strokeWeight(1);
  textAlign(CENTER);
  textSize(this.textS);
  stroke(82, 20, 82);
  fill(209, 179, 255);
  text(t1, this.x+this.sliderWidth/2, this.y-this.textS-12  );
  text(t2, this.x+this.sliderWidth/2, this.y-this.textS*0.8);
  text(t3, this.x+this.sliderWidth/2, this.y+this.sliderHeight-16);
  text(t4, this.x+this.sliderWidth/2, this.y+this.sliderHeight);
  // triangle marker
  noStroke();
  fill(this.tfillCol);
  triangle(this.x+(this.sliderWidth/2)+7, this.ty+7, this.x+(this.sliderWidth/2)+7, this.ty-7, this.x+(this.sliderWidth/2-7)+7, this.ty);
};

  this.envLoc = function(ampVal){
    this.ty = map(ampVal, 0.0, 1.0, this.y+this.sliderHeight-(this.tbSpace*1.5), this.y);
    //console.log(this.ty);
  }

 // if envelop automator is not on use mouse Y to update slider position
 this.updateLoc = function() {
   var flagX, flagY;
   // check if over
   if (mouseY > this.y && mouseY < this.y+this.sliderHeight-(this.tbSpace*1.5))   { // makes sure mouse is above or below fader
     flagY = true;
   }
   if (mouseX > this.x+this.sliderWidth/2 && mouseX < this.x+this.sliderWidth ) { // makes sure mouse is within fader's width
     flagX = true;
   }
   // change triangle color if over
   if(flagX && flagY){
   this.tfillCol = '#e600e6';
 } else {
   this.tfillCol = '#fff';
 }
  // update with Y position if mouse is pressed
   if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
     //call == 0;
     this.ty = mouseY;
     this.inter = true;
     //birdsound.setVolume(level1);
   } else if (this.inter == false){
     this.ty = this.triY;
   }
 };
};


  //strokeWeight(2);
  //triangle(fx+(this.sliderWidth/2)+7, ty+7, fx+(this.sliderWidth/2)+7, ty-7, fx+(this.sliderWidth/2-7)+7, ty);
  // var out = map(posY, 160, 50, -70, 6);
  // var outint = int(out);
  // textSize(16);
  // strokeWeight(1);
  // stroke(255);
  // text(1, 40, 185);
  // stroke(125);
  // strokeWeight(4);
  // fill(125);
  // line(48, 60, 52, 60);
  // connectOne = outint;
//}
