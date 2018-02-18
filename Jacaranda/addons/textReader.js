
var textReader = function(num) {
  this.x = 20;
  this.y = height/2+100;
  this.line = 0;
  this.texts = script.getString(this.line, 0);
  this.length = num;

  this.display = function(){
    fill(233,233,4,100);
    var myLength = this.texts.length;
    textFont('Helvetica');
    textSize(width/(myLength/2));
    textAlign("left");
    text(this.texts, this.x, this.y);
    textSize(14);
    fill(209, 179, 255, 200);
    text("reading speed: "+rate, this.x, this.y+30);
    fill(209, 179, 255, 150);
    if(this.line == this.length-1){
      text("the end, reload page to restart", this.x+140, this.y+30);
    } else {
      text("use UP and DOWN arrows keys", this.x+140, this.y+30);
    }
  }

  this.updateText = function(myStep){
    myStep;
    if(myStep && this.line < this.length-1){
      this.line = this.line +1
    } else if (this.line == this.length-1){
      this.text = "They where walking towards each other all of thier lives";
    }
    this.texts = script.getString(this.line, 0);
    console.log(this.line);
  }

}
