var ps;
var slider1;
var slider2;
var slider3;
var envTog;
var envBoo = false;
var filterTog;
var filterBoo = false;
var level1 = 0;
var level2 = 0;
var level3 = 0;
var filterObj;
// slider positions
var f1x,f1y,f2x,f2y,f3x,f3y;
// filter position
var flt1x, flt1y;
// sound vars
var birdsound, cracklesound, thundersound, e1, e2, e3, silentsound;
var env1, env2, env3, env4, osc1, osc2, osc3, osc4, amp1, amp2, amp3, amp4, cnv;
var filter, fft;
// Toggles

function preload (){
  soundFormats('mp3','ogg');
  // //birdsound = loadSound('media/birds.ogg');
  // //cracklesound = loadSound('media/crackle.ogg');
  // //thundersound = loadSound('media/Thunder.ogg');
  birdsound = loadSound('media/birds.mp3');
  cracklesound = loadSound('media/crackle.mp3');
  thundersound = loadSound('media/Thunder.mp3');
  e1 = loadSound('media/e1.ogg');
  e2 = loadSound('media/e2.ogg');
  e3 = loadSound('media/e3.ogg');
  silentsound = loadSound('media/silence.ogg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFrameRate(60);
  // create checkboxes
  envTog = createCheckbox('Automate', false);
  envTog.changed(checkValEnv);
  envTog.position(width/3,30);
  filterTog = createCheckbox('Filter On', false);
  filterTog.changed(checkValFilter);
  filterTog.position(width/3+300,30);
  // sliders in relation to screen width
  f1x = width/3;
  f1y = 100;
  f2x = width/3+100;
  f2y = 100;
  f3x = width/3+200;
  f3y = 100;
  slider1 = new Slider(f1x,f1y,"Thunder", "Blossom", "Wieght");
  slider2 = new Slider(f2x,f2y,"Birds", "Afternoon", "to Twilight");
  slider3 = new Slider(f3x,f3y,"Cooking", "Spreading", "Breeze" );
  //filter
  filter = new p5.BandPass();
  fft = new p5.FFT();
  flt1x = width/3+300;
  flt1y = 90;
  filterObj = new Filter(flt1x, flt1y);
  // particle system
  ps = new ParticleSystem(createVector(random(50, width/3), 100));
  //sound
  birdsound.setVolume(0);
  birdsound.loop();
  cracklesound.setVolume(0);
  cracklesound.loop();
  thundersound.setVolume(0);
  thundersound.loop();
  e1.setVolume(0.2);
  e2.setVolume(0.2);
  e3.setVolume(0.2);

  // envelope
  // env1 = new p5.Env();
  // env1.setADSR(attackTime1, decayTime1);
  // // oscillators
  // osc1 = new p5.Oscillator();
  // osc1.amp(env1);
  // osc1.start();
  // // set amplitude against oscillators
  // amp1 = new p5.Amplitude();
  // amp1.setInput(osc1);
  // osc1.disconnect();
  // osc1.connect(amp1);
  // // add cue
  // silentsound.addCue(0.20, nextEnv1);
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
  var collision = map(level1, 0.0, 1.0, 3, 5);
  ps.addParticle();
  ps.run(wind);
  r = int(random(collision));// ussing level 1 to change
  if (r == 1) {
    e1.play();
  }
  if (r == 2) {
    e2.play();
  }
  if (r == 3) {
    e3.play();
  }

  // SOUND

  // envelope

  // var reading1 = amp1.getLevel();
  // var scaled1 = map(reading1, 0, 0.7, 160, 50);

  // draw sliders and update levels
  slider1.display();
  slider1.updateLoc();
  level1 = map(slider1.ty, f1y, f1y+slider1.sliderHeight-(slider1.tbSpace*1.5),1.0,0.0); // based on slider height
  slider2.display();
  slider2.updateLoc();
  level2 = map(slider2.ty, f2y, f2y+slider2.sliderHeight-(slider2.tbSpace*1.5),1.0,0.0); // based on slider height
  slider3.display();
  slider3.updateLoc();
  level3 = map(slider3.ty, f3y, f3y+slider3.sliderHeight-(slider3.tbSpace*1.5),0.5,0.0); // based on slider height

  // sound files volume to slider
  birdsound.setVolume(level2);
  cracklesound.setVolume(level3);
  thundersound.setVolume(level1);
  //draw filter
  filterObj.display();
}

function filterOn(){
  birdsound.disconnect();
  birdsound.connect(filter);
  cracklesound.disconnect();
  cracklesound.connect(filter);
  thundersound.disconnect();
  thundersound.connect(filter);
  e1.disconnect();
  e1.connect(filter);
  e2.disconnect();
  e2.connect(filter);
  e3.disconnect();
  e3.connect(filter);
  // e4.disconnect();
  // e4.connect(filter);
  // e5.disconnect();
  // e5.connect(filter);
}

function checkValEnv(){
  if(envTog.changed && envBoo == false){
    envBoo = true;
  }else{
    envBoo = false;
  }
  //console.log("env: "+envBoo);
}

function checkValFilter(){
  if(filterTog.changed && filterBoo == false){
    filterBoo = true;
  }else{
    filterBoo = false;
  }
  //console.log("filter: "+filterBoo);
}
