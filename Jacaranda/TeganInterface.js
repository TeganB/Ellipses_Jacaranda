//Objects
var ps;
var script;
var reader;
var slider1;
var slider2;
var slider3;
var filterObj;
// interface sliders, toggles
var envTog;
var envBoo = false;
var filterTog;
var filterBoo = false;
var level1 = 0;
var level2 = 0;
var level3 = 0;
var numLines;
// reader variables
var shift;
var tick;
var sec = 3;
var rate = 3;
// slider positions
var f1x,f1y,f2x,f2y,f3x,f3y;
// filter position
var flt1x, flt1y;
// sound vars
var birdsound, cracklesound, thundersound, e1, e2, e3, e4, e5, silentsound;
var env1, env2, env3, env4, osc1, osc2, osc3, osc4, amp1, amp2, amp3, amp4, cnv;
var filter1, fft;
// Envelop Data
// Envelop 1
var attackTime1 = 0.9;
var decayTime1 = 5;
var attackLevel1 = 0.2;
var decayLevel1 = 0;
// Envelop 2
var attackTime2 = 0.9;
var decayTime2 = 0.9;
var attackLevel2 = 1;
var decayLevel2 = 0;
// Envelop 3
var attackTime3 = 0.9;
var decayTime3 = 0.9;
var attackLevel3 = 1;
var decayLevel3 = 0;
// Envelop 4
var attackTime4 = 0.9;
var decayTime4 = 0.9;
var attackLevel4 = 1;
var decayLevel4 = 0;
// Envelop 5
var attackTime5 = 0.9;
var decayTime5 = 0.9;
var attackLevel5 = 1;
var decayLevel5 = 0;

function preload (){
  soundFormats('mp3','ogg');
  birdsound = loadSound('media/birds.ogg');
  cracklesound = loadSound('media/crackle.ogg');
  thundersound = loadSound('media/Thunder.ogg');
  e1 = loadSound('media/e1.ogg');
  e2 = loadSound('media/e2.ogg');
  e3 = loadSound('media/e3.ogg');
  e4 = loadSound('media/e4.ogg');
  e5 = loadSound('media/e5.ogg');
  silentsound = loadSound('media/silence.ogg');
  script = loadTable('media/JacarandaScript.csv', 'csv');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFrameRate(30);
  // particle system
  ps = new ParticleSystem(createVector(random(50, width/3), 100));
  // text Jacaranda
  tick = second()+3;
  numLines = script.getRowCount();
  reader = new textReader(numLines);
  // create checkboxes
  envTog = createCheckbox('Automate sound files and effects', false);
  envTog.changed(checkValEnv);
  envTog.position(width-260,20);
  filterTog = createCheckbox('Filter via Spectrum', false);
  filterTog.changed(checkValFilter);
  filterTog.position(width-250,height-240);
  // sliders in relation to screen width
  f1x = width-260;
  f1y = 80;
  f2x = width-180;
  f2y = 80;
  f3x = width-100;
  f3y = 80;
  slider1 = new Slider(f1x,f1y,"Thunder", "Blossom", "Wieght");
  slider2 = new Slider(f2x,f2y,"Birds", "Afternoon", "to Twilight");
  slider3 = new Slider(f3x,f3y,"Cooking", "Spreading", "Breeze" );
  //filter Object
  filter1 = new p5.BandPass();
  fft = new p5.FFT();
  flt1x = width-250;
  flt1y = height-200;
  filterObj = new Filt(flt1x, flt1y);
  //sound
  birdsound.setVolume(0);
  birdsound.loop();
  cracklesound.setVolume(0);
  cracklesound.loop();
  thundersound.setVolume(0);
  thundersound.loop();
  e1.setVolume(0.1);
  e2.setVolume(0.1);
  e3.setVolume(0.1);
  e4.setVolume(0.1);
  e5.setVolume(0.1);
  // Envelopes
  env1 = new p5.Env();
  env2 = new p5.Env();
  env3 = new p5.Env();
  env4 = new p5.Env();
  env5 = new p5.Env();
  // Oscillators
  osc1 = new p5.Oscillator();//oscillators provide stable output for the automated faders. They're not heard.
  osc1.amp(env1);
  osc1.start(); // check procrssing
  osc2 = new p5.Oscillator();
  osc2.amp(env2);
  osc2.start();
  osc3 = new p5.Oscillator();
  osc3.amp(env3);
  osc3.start();
  osc4 = new p5.Oscillator();
  osc4.amp(env4);
  osc4.start();
  // Amplitude
  amp1 = new p5.Amplitude();
  amp1.setInput(osc1);
  osc1.disconnect();
  osc1.connect(amp1); // may not make a difference
  amp2 = new p5.Amplitude();
  amp2.setInput(osc2);
  osc2.disconnect();
  osc2.connect(amp2);
  amp3 = new p5.Amplitude();
  amp3.setInput(osc3);
  osc3.disconnect();
  osc3.connect(amp3);
  amp4 = new p5.Amplitude();
  amp4.setInput(osc4);
  osc4.disconnect();
  osc4.connect(amp4);
  //Link to Sound
  silentsound.addCue(0.20, nextEnv1);//this soundfile is used as a timeline for the cues
  silentsound.addCue(0.20, nextEnv2);
  silentsound.addCue(10.00, nextEnv3);
  silentsound.addCue(25.00, nextEnv4);
  silentsound.addCue(51.00, nextEnv5);
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
  // draw sliders
  slider1.display();
  slider2.display();
  slider3.display();
  //Script
  reader.display();
  if (second() == tick && sec != tick && tick < 59) {
    shift = true;
    reader.updateText(shift);
    sec = tick;
    shift = false;
    tick += rate;
  } else if(tick > 58){
    tick = 1;
  }

   console.log(second());
   console.log(tick);
  //envelop switched on
  if(envBoo){
    var autoLevel1 = amp1.getLevel();
    var autoLevel2 = amp2.getLevel();
    var autoLevel3 = amp3.getLevel();
    var triLevel1 = map(autoLevel1, 0.00, 0.5, 0.0, 0.9); // birds
    var triLevel2 = map(autoLevel2, 0.00, 0.5, 0.0, 0.9); // crackle
    var triLevel3 = map(autoLevel3, 0.00, 0.5, 0.0, 0.9); // thunder
    slider1.envLoc(triLevel3);
    slider2.envLoc(triLevel1);
    slider3.envLoc(triLevel2);
  }  else //envelop switched on
  {
    // stop silentsound
    silentsound.stop();
    // randomly play short sounds
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
    slider1.updateLoc();
    slider2.updateLoc();
    slider3.updateLoc();
    // sound files volume to slider level
    birdsound.setVolume(level2);
    cracklesound.setVolume(level3);
    thundersound.setVolume(level1);
  }
  // read level based on slider position
  level1 = map(slider1.ty, f1y, f1y+slider1.sliderHeight-(slider1.tbSpace*1.5),1.0,0.0); // based on slider height
  level2 = map(slider2.ty, f2y, f2y+slider2.sliderHeight-(slider2.tbSpace*1.5),1.0,0.0); // based on slider height
  level3 = map(slider3.ty, f3y, f3y+slider3.sliderHeight-(slider3.tbSpace*1.5),0.5,0.0); // based on slider height
  //draw and access filter
  filterObj.display();
  if(filterBoo){
    filterOn();
  } else{
    filterOff();
  }
}

function filterOn(){
  birdsound.disconnect();
  birdsound.connect(filter1);
  cracklesound.disconnect();
  cracklesound.connect(filter1);
  thundersound.disconnect();
  thundersound.connect(filter1);
  e1.disconnect();
  e1.connect(filter1);
  e2.disconnect();
  e2.connect(filter1);
  e3.disconnect();
  e3.connect(filter1);
  e4.disconnect();
  e4.connect(filter1);
  e5.disconnect();
  e5.connect(filter1);
  if(mouseX > filterObj.x && mouseX < filterObj.x+filterObj.width && mouseY > filterObj.y && mouseY < filterObj.y+this.height){
    cursor(CROSS);
    if(mouseIsPressed){
      var freq = map(mouseX, filterObj.x-filterObj.width, filterObj.x, 20, 10000); // what is this?
      //constrain(freq, 10, 10000);
      filter1.freq(freq);
      // give the filter a narrow band (lower res = wider bandpass)
      filter1.res(50);//was 50
    }
  } else {
    cursor(ARROW);
  }

}

function filterOff(){
  birdsound.disconnect();
  birdsound.connect();
  cracklesound.disconnect();
  cracklesound.connect();
  thundersound.disconnect();
  thundersound.connect();
  e1.disconnect();
  e1.connect();
  e2.disconnect();
  e2.connect();
  e3.disconnect();
  e3.connect();
  cursor(ARROW);
  e4.disconnect();
  e4.connect();
  e5.disconnect();
  e5.connect();
}

// Envelop Functions
function nextEnv1(){
  env4.setADSR(0, 0.2, 0.9, 10);
  env4.setRange(0.6, 0);
  env4.play(osc4, 0, 20);
  env4.play(e1, 0, 20);
  env4.play(e2, 0, 20);
  env4.play(e3, 0, 20);
  env4.play(e4, 0, 20);
  env4.play(e5, 0, 20);
}

function nextEnv2(){
  env1.setADSR(5, 0.2, 0.8, 4);
  env1.setRange(0.8, 0);
  env1.play(osc1, 0, 66);
  env1.play(birdsound, 0, 66);
}

function nextEnv3(){
  env2.setADSR(20, 0.2, 0.6, 5);
  env2.setRange(0.6, 0);
  env2.play(osc2, 0, 15);
  env2.play(cracklesound, 0, 15);

}

function nextEnv4(){
  env3.setADSR(15, 0.2, 0.8, 5);
  env3.setRange(0.8, 0);
  env3.play(osc3, 0, 16);
  env3.play(thundersound, 0, 16);
}

function nextEnv5(){
  env5.setADSR(10, 0.2, 0.6, 3);
  env5.setRange(0.6, 0);
  env5.play(osc4, 0, 7);
  env5.play(e1, 0, 8);
  env5.play(e2, 0, 8);
  env5.play(e3, 0, 8);
  env5.play(e4, 0, 8);
  env5.play(e5, 0, 8);
}

function checkValFilter(){
  if(filterTog.changed && filterBoo == false){
    filterBoo = true;
  }else{
    filterBoo = false;
  }
}

function checkValEnv(){
  if(envTog.changed && envBoo == false){
    envBoo = true;
    silentsound.play();
  }else if (envTog.changed && envBoo == true){
    envBoo = false;
    silentsound.stop();
  }
};

function keyReleased() {
  if (keyCode == UP_ARROW) {
    rate = rate-1;
  }
   if (keyCode == DOWN_ARROW) {
    rate = rate+1;
  }
  rate = constrain(rate, 1, 10);
  //console.log(shift);
  //reader.updateText(shift);
}
