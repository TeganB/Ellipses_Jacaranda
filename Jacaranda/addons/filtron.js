// Filter Object
var Filt = function(ftx, fty) {
  this.x = ftx;
  this.y = fty;
  this.width = 200;
  this.height = 200;

  this.display = function(){
    // draw base
    strokeWeight(1);
    textSize(14);
    stroke(82, 20, 82);
    fill(209, 179, 255);
    text("Sound Spectrum", this.x, this.y+this.height+20);
    noStroke();
    fill(0, 20);
    rect(this.x, this.y, this.width, this.height);
    // select frequency

    // draw filtered spectrum
    var spectrum = fft.analyze();
    fill(255, 40, 255);
    for (var i = 0; i < spectrum.length; i++) {
      var x = map(i, 0, spectrum.length, this.x, this.x+this.width);
      var h = -this.height + map(spectrum[i], 0, 255, this.height, 0);
      rect(x, this.y+this.height, this.width/spectrum.length, h);
    }
  }
}
