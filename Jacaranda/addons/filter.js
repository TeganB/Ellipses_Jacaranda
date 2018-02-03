// Filter Object

var Filter = function(ftx, fty) {
  this.x = ftx;
  this.y = fty;
  this.width = 200;
  this.height = 150;

  this.display = function(){
    textSize(14);
    text("Sound Spectrum", this.x+this.width/2, this.y-14);
    noStroke();
    fill(0);
    rect(this.x, this.y, this.width, this.height);
    var scmse = map(mouseX, this.x, this.x+this.width, 500, 940);
    var freq = map(scmse, this.x, this.x+this.width, 10, 10000); // was 500, 700, 20, 10000
    constrain(freq, 10, 10000);
    filter.freq(freq);
    // give the filter a narrow band (lower res = wider bandpass)
    filter.res(18);//was 50

    // draw filtered spectrum
    fill(255, 40, 255);
    var spectrum = fft.analyze();
    for (var i = 0; i < spectrum.length; i++) {
      var xi = map(i, 0, spectrum.length, this.x, this.x+this.width);
      var hi = -this.height + map(spectrum[i], 0, 255, 150, 0);
      rect(xi, this.y, this.width/spectrum.length, hi);
    }
  }
}