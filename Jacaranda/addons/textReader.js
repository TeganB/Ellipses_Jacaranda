
var textReader = function(num) {
  this.x = 20;
  this.y = height/2+95;
  this.line = 0;
  this.texts = script.getString(this.line, 0);
  this.length = num;

  this.display = function(){
    fill(233,233,4,130);
    var myLength = this.texts.length;
    textFont('Helvetica');
    textSize(width/(myLength/2));
    textAlign("left");
    text(this.texts, this.x, this.y);
    textSize(15);
    //fill(209, 179, 255, 200);
    fill(77, 0, 102, 200);
    text("Orginal poetic script, line by line.   Reading speed: "+rate, this.x+5, this.y+30);
    fill(77, 0, 102, 200);
    //fill(209, 179, 255, 150);
    if(this.line == this.length-1){
      text("The end, reload page to restart", this.x+380, this.y+30);
    } else {
      text("Use UP and DOWN arrows keys to change speed", this.x+380, this.y+30);
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
    //console.log(this.line);
  }

}
