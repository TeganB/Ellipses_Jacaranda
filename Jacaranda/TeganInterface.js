var ps;
var slider1;
var slider2;
var slider3;
var level1 = 0;
var level2 = 0;
var level3 = 0;
var filterObj;
// slider positions
var f1x,f1y,f2x,f2y,f3x,f3y;
// filter position
var flt1x, flt1y;
// sound vars
var birdsound;
var filter, fft;

function preload (){
  soundFormats('mp3','ogg');
  birdsound = loadSound('media/birds.ogg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFrameRate(60);
  // sliders in relation to screen width
  f1x = width/3;
  f1y = 60;
  f2x = width/3+100;
  f2y = 60;
  f3x = width/3+200;
  f3y = 60;
  slider1 = new Slider(f1x,f1y,"fader 1");
  slider2 = new Slider(f2x,f2y,"fader 2");
  slider3 = new Slider(f3x,f3y,"fader 3");
  //filter
  filter = new p5.BandPass();
  fft = new p5.FFT();
  flt1x = width/3+300;
  flt1y = 60;
  filterObj = new Filter(flt1x, flt1y);
  // particle system
  ps = new ParticleSystem(createVector(random(50, width/3), 100));
  //sound
  birdsound.setVolume(0);
  birdsound.loop();
}

function draw() {
  var redRange = map(level2, 1.0, 0.0, 200, 40);
  background(123, redRange/2, redRange);
  noStroke();
  // background grade
  fill(115, redRange/2, 230, 15);
  var rectSize = width/20;
  for(var i = 0; i < 28; i++){
    rectSize = rectSize + 20;
    rect(0,0, rectSize, height);
  }
  // PARTICLES
  var gravity = createVector(0, level1/5);
  ps.applyForce(gravity);
  var wind = map(level3, 0.0, 1.0, 0.5, 1.5);
  ps.addParticle();
  ps.run(wind);

  // SOUND
  // draw sliders and update levels
  slider1.display();
  slider1.updateLoc();
  level1 = map(slider1.ty, f1y, f1y+slider1.sliderHeight-(slider1.tbSpace*1.5),1.0,0.0); // based on slider height
  slider2.display();
  slider2.updateLoc();
  level2 = map(slider2.ty, f2y, f2y+slider2.sliderHeight-(slider2.tbSpace*1.5),1.0,0.0); // based on slider height
  slider3.display();
  slider3.updateLoc();
  level3 = map(slider3.ty, f3y, f3y+slider3.sliderHeight-(slider3.tbSpace*1.5),1.0,0.0); // based on slider height
  // sound files 
  birdsound.setVolume(level2);
  //draw filter
  filterObj.display();
}
