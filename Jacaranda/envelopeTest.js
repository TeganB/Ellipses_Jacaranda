//Objects
var slider1;
var slider2;
var slider3;
// interface sliders, toggles
var envTog;
var envBoo = false;
var level1 = 0;
var level2 = 0;
var level3 = 0;
// slider positions
var f1x,f1y,f2x,f2y,f3x,f3y;
// sound vars
var birdsound, cracklesound, thundersound, e1, e2, e3, silentsound;
var env1, env2, env3, env4, osc1, osc2, osc3, osc4, amp1, amp2, amp3, amp4, cnv;
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
  e4 = loadSound('media/e3.ogg');
  e5 = loadSound('media/e3.ogg');
  silentsound = loadSound('media/silence.ogg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFrameRate(60); // frameRate was 60?
  // create checkboxes
  envTog = createCheckbox('Automate', false);
  envTog.changed(checkValEnv);
  envTog.position(width-280,30);
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
  // sliders in relation to screen width
  f1x = width-360;
  f1y = 90;
  f2x = width-280;
  f2y = 90;
  f3x = width-200;
  f3y = 90;
  slider1 = new Slider(f1x,f1y,"Thunder", "Blossom", "Wieght");
  slider2 = new Slider(f2x,f2y,"Birds", "Afternoon", "to Twilight");
  slider3 = new Slider(f3x,f3y,"Cooking", "Spreading", "Breeze" );

  // Envelope
  env1 = new p5.Env();
  env2 = new p5.Env();
  env3 = new p5.Env();
  env4 = new p5.Env();
  env5 = new p5.Env();
  // Oscillator
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
  var redRange = 200;
  background(123, redRange/2, redRange);
  noStroke();
  // background grade
  fill(115, 100, 230, 15);
  var rectSize = width/20;
  for(var i = 0; i < 28; i++){
    rectSize = rectSize + 20;
    rect(0,0, rectSize, height);
  }

  // SOUND
  slider1.display();
  slider2.display();
  slider3.display();
  console.log(envBoo); // automate on or off
  if(envBoo){
    console.log("amp level");
    console.log(amp1.getLevel());
    console.log(amp2.getLevel());
    console.log(amp3.getLevel());
    var autoLevel1 = amp1.getLevel();
    var autoLevel2 = amp2.getLevel();
    var autoLevel3 = amp3.getLevel();
    var triLevel1 = map(autoLevel1, 0.00, 0.5, 0.0, 0.9); // birds
    var triLevel2 = map(autoLevel2, 0.00, 0.5, 0.0, 0.9); // crackle
    var triLevel3 = map(autoLevel3, 0.00, 0.5, 0.0, 0.9); // thunder
    console.log("tri level");
    slider1.envLoc(triLevel3);
    slider2.envLoc(triLevel1);
    slider3.envLoc(triLevel2);
  }  else {
    silentsound.stop();
    level1 = map(slider1.ty, f1y, f1y+slider1.sliderHeight-(slider1.tbSpace*1.5),1.0,0.0); // based on slider height
    level2 = map(slider2.ty, f2y, f2y+slider2.sliderHeight-(slider2.tbSpace*1.5),1.0,0.0); // based on slider height
    level3 = map(slider3.ty, f3y, f3y+slider3.sliderHeight-(slider3.tbSpace*1.5),0.5,0.0); // based on slider height
    slider1.updateLoc();
    slider2.updateLoc();
    slider3.updateLoc();
    birdsound.setVolume(level2);
    cracklesound.setVolume(level3);
    thundersound.setVolume(level1);
}


  // sound files volume to slider
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
};

function nextEnv2(){
  env1.setADSR(5, 0.2, 0.8, 4);
  env1.setRange(0.8, 0);
  env1.play(osc1, 0, 66);
  env1.play(birdsound, 0, 66);
};

function nextEnv3(){
  env2.setADSR(20, 0.2, 0.6, 5);
  env2.setRange(0.6, 0);
  env2.play(osc2, 0, 15);
  env2.play(cracklesound, 0, 15);
};

function nextEnv4(){
  env3.setADSR(15, 0.2, 0.8, 5);
  env3.setRange(0.8, 0);
  env3.play(osc3, 0, 16);
  env3.play(thundersound, 0, 16);
};

function nextEnv5(){
  env5.setADSR(10, 0.2, 0.6, 3);
  env5.setRange(0.6, 0);
  env5.play(osc4, 0, 7);
  env5.play(e1, 0, 8);
  env5.play(e2, 0, 8);
  env5.play(e3, 0, 8);
  env5.play(e4, 0, 8);
  env5.play(e5, 0, 8);
};

function checkValEnv(){
  if(envTog.changed && envBoo == false){
    envBoo = true;
    silentsound.play();
  }else if (envTog.changed && envBoo == true){
    envBoo = false;
    silentsound.stop();
    // env1.stop();
    // env2.stop();
    // env3.stop();
    // env4.stop();
    // env5.stop();
  }
};
