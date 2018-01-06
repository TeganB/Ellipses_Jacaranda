//Cameron's partial sound prototype for Jacaranda Time
var posY = 160, possY = 160, posssY = 160, possssY = 60; // sets default position of the faders
var env1, env2, env3, env4, osc1, osc2, osc3, osc4, amp1, amp2, amp3, amp4, cnv;
var attackTime1 = 0.9;
var decayTime1 = 5;
var attackLevel1 = 0.2;
var decayLevel1 = 0;
var attackTime2 = 0.9;
var decayTime2 = 0.9;
var attackLevel2 = 1;
var decayLevel2 = 0;
var attackTime3 = 0.9;
var decayTime3 = 0.9;
var attackLevel3 = 1;
var decayLevel3 = 0;
var attackTime4 = 0.9;
var decayTime4 = 0.9;
var attackLevel4 = 1;
var decayLevel4 = 0;
var attackTime5 = 0.9;
var decayTime5 = 0.9;
var attackLevel5 = 1;
var decayLevel5 = 0;
var call = 0;
var birdsound, cracklesound, thundersound, e1, e2, e3, e4, e5, silentsound;
var level, level2, level3, level4;
var img;// just for inspiration!!
var redbutton = [76, 153, 0, 150];
var filter, fft;
var filteron = 0, filterbutton = [76, 153, 0, 150];

function preload() {
  soundFormats('ogg');
  birdsound = loadSound('media/birds.ogg');
  cracklesound = loadSound('media/crackle.ogg');
  thundersound = loadSound('media/Thunder.ogg');
  e1 = loadSound('media/e1.ogg');
  e2 = loadSound('media/e2.ogg');
  e3 = loadSound('media/e3.ogg');
  e4 = loadSound('media/e4.ogg');
  e5 = loadSound('media/e5.ogg');
  silentsound = loadSound('media/silence.ogg');
  img = loadImage('media/jacaranda1.jpg')
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  frameRate(30);
  filter = new p5.BandPass();
  fft = new p5.FFT();
  birdsound.setVolume(0);
  cracklesound.setVolume(0);
  thundersound.setVolume(0);
  birdsound.loop();
  cracklesound.loop();
  thundersound.loop();
  e1.setVolume(0.3);
  e2.setVolume(0.3);
  e3.setVolume(0.3);
  slider = createSlider(0, 100, 30);
  slider.position(500, 50);

  env1 = new p5.Env();
  env1.setADSR(attackTime1, decayTime1);
  env2 = new p5.Env();
  env2.setADSR(attackTime2, decayTime2);
  env2.setRange(0, 0);
  env3 = new p5.Env();
  env3.setADSR(attackTime3, decayTime3);
  env4 = new p5.Env();
  env4.setADSR(attackTime5, decayTime5);
  env5 = new p5.Env();
  env5.setADSR(attackTime5, decayTime5);

  osc1 = new p5.Oscillator();//oscillators provide stable output for the automated faders. They're not heard.
  osc1.amp(env1);
  osc1.start();
  osc2 = new p5.Oscillator();
  osc2.amp(env2);
  osc2.start();
  osc3 = new p5.Oscillator();
  osc3.amp(env3);
  osc3.start();
  osc4 = new p5.Oscillator();
  osc4.amp(env4);
  osc4.start();

  amp1 = new p5.Amplitude();
  amp1.setInput(osc1);
  osc1.disconnect();
  osc1.connect(amp1);
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

  silentsound.addCue(0.20, nextEnv1);//this soundfile is used as a timeline for the cues
  silentsound.addCue(0.20, nextEnv2);
  silentsound.addCue(10.00, nextEnv3);
  silentsound.addCue(25.00, nextEnv4);
  silentsound.addCue(51.00, nextEnv5);
  //silentsound.addCue(0.50, nextEnv1);
  //silentsound.addCue(0.50, nextEnv1);
  //silentsound.addCue(0.50, nextEnv1);
}

function draw() {
  background(img);
  stroke(255);
  strokeWeight(3);
  textSize(14);
  fill(50);
   line(510, 45, 630, 45);
  text("Collision speed", 520, 30);
  var slidval = slider.value();
  var mappedval = map(slidval, 0, 100, 100, 30);
  fill(filterbutton);
  rect(900, 150, 50, 50); // filter on/off button
  text("Resonant Filter on/off", 860, 145);

r = int(random(mappedval));// originally 51

if (r == 1) {
  e1.play();
}
if (r == 2) {
  e2.play();
}
if (r == 3) {
  e3.play();
}
  fill(50);
  textFont("Arial", 32);
  level1 = map(posY, 50, 160, 0.6, 0);
  level2 = map(possY, 50, 160, 0.6, 0);
  level3 = map(posssY, 50, 160, 0.6, 0);
  level4 = map(possssY, 50, 160, 0.6, 0);
  var reading1 = amp1.getLevel();
  var reading2 = amp2.getLevel();
  var reading3 = amp3.getLevel();
  var reading4 = amp4.getLevel();
  var scaled1 = map(reading1, 0, 0.7, 160, 50);
  var scaled2 = map(reading2, 0, 0.7, 160, 50);
  var scaled3 = map(reading3, 0, 0.7, 160, 50);
  var scaled4 = map(reading4, 0, 0.7, 160, 50);
  if (call == 1) {
  posY = scaled1;
  possY = scaled2;
  posssY = scaled3;
  possssY = scaled4;
  }
  Fader(50, 50, 160, 20);
  FaderTwo(160, 50, 160);
  FaderThree(270, 50, 160);
  FaderFour(380, 50, 160);
  textSize(16);
  fill(255, 0, 0);
  Button();
  drawFilter();
}

function Fader(x, y1, y2, a2) {
  strokeWeight(0);
  fill(160, 160, 160, 205);
  rect(a2, a2, 70, 190);
  strokeWeight(4);
  stroke(255);
  line(x, y1, x, y2);
  strokeWeight(3);
  textSize(14);
  fill(50);
  text("Birds", (a2+15), (a2+20));
  var flagX, flagY;
  
  if (mouseY > y1-1 && mouseY < y2+1 ) { // makes sure mouse is above or below fader
    flagY = true;
  }
  
  if (mouseX > x - 40 && mouseX < x + 40) { // makes sure mouse is within fader's width
    flagX = true;
  }

  if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
  	call == 0;
    posY = mouseY; //set posY to current mouse position
    birdsound.setVolume(level1);
  }

  fill(75);
  strokeWeight(2);
  triangle(65, posY+5, 65, posY-5, 55, posY);
  var out = map(posY, 160, 50, -70, 6);
  var outint = int(out);
  textSize(16);
  strokeWeight(1);
  stroke(255);
  text(outint, 40, 185);
  stroke(125);
  strokeWeight(4);
  fill(125);
  line(48, 60, 52, 60);
  connectOne = outint;
}

function FaderTwo(a, b1, b2) {
  noStroke();
  fill(160, 160, 160, 205);
  rect(a-30, b1-30, 70, 190);
  strokeWeight(4);
  stroke(255);
  line(a, b1, a, b2);
  strokeWeight(3);
  textSize(14);
  fill(50);
  text("Crackle", (a-18), (b1-10));
  var flaggX, flaggY;
  var Manfad;
  Manfad = map(mouseY, 160, 50, 0, 0.7);
  
  if (mouseY > b1-1 && mouseY < b2+1 ) { // makes sure mouse is above or below fader
    flaggY = true;
  }
  
  if (mouseX > a - 40 && mouseX < a + 40) { // makes sure mouse is within fader's width
    flaggX = true;
  }

  if ((flaggY && flaggX) && mouseIsPressed) { // if a click is made within the fader
    call = 0;
    possY = mouseY; //set possY to current mouse position
   cracklesound.setVolume(level2);
  }

  //translate(100, 0); 
  fill(75);
  strokeWeight(2);
  triangle(175, possY+5, 175, possY-5, 165, possY);
  var out = map(possY, 160, 50, -70, 6);
  var outintTwo = int(out);
  textSize(16);
  strokeWeight(1);
  stroke(255);
  text(outintTwo, 150, 185);
  stroke(125);
  strokeWeight(4);
  fill(125);
  line(158, 60, 162, 60);
  connectTwo = outintTwo;
}

function FaderThree(c, d1, d2) {
  //strokeWeight(2);
  noStroke();
  fill(160, 160, 160, 205);
  rect(c-27, d1-30, 70, 190);
  strokeWeight(4);
  stroke(255);
  line(c, d1, c, d2);
  strokeWeight(3);
  textSize(14);
  fill(50);
  text("Thunder", (c-18), (d1-10));
  var flagX, flagY;
  var Manfadd;
  Manfadd = map(mouseY, 160, 50, 0, 0.7);
  
  if (mouseY > d1-1 && mouseY < d2+1 ) { // makes sure mouse is above or below fader
    flagY = true;
  }
  
  if (mouseX > c - 40 && mouseX < c + 40) { // makes sure mouse is within fader's width
    flagX = true;
  }

  if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
    call = 0;
    posssY = mouseY; //set possY to current mouse position
    thundersound.setVolume(level3);
  }

  //translate(100, 0); 
  fill(75);
  strokeWeight(2);
  triangle(285, posssY+5, 285, posssY-5, 275, posssY);
  var out = map(posssY, 160, 50, -70, 6);
  var outintThree = int(out);
  textSize(16);
  strokeWeight(1);
  stroke(255);
  text(outintThree, 260, 185);
  stroke(125);
  strokeWeight(4);
  fill(125);
  line(268, 60, 272, 60);
  connectThree = outintThree;
}

function FaderFour(g, h1, h2) {
  //strokeWeight(2);
  noStroke();
  fill(160, 160, 160, 205);
  rect(g-27, h1-30, 70, 190);
  strokeWeight(4);
  stroke(255);
  line(g, h1, g, h2);
  strokeWeight(3);
  textSize(14);
  fill(50);
  text("Blossoms", (g-22), (h1-10));
  var flagX, flagY;
  var Manfadd;
  Manfadd = map(mouseY, 160, 50, 0, 0.7);
  
  if (mouseY > h1-1 && mouseY < h2+1 ) { // makes sure mouse is above or below fader
    flagY = true;
  }
  
  if (mouseX > g - 40 && mouseX < g + 40) { // makes sure mouse is within fader's width
    flagX = true;
  }

  if ((flagY && flagX) && mouseIsPressed) { // if a click is made within the fader
    call = 0;
    possssY = mouseY; //set possY to current mouse position
    e1.setVolume(level4);
    e2.setVolume(level4);
    e3.setVolume(level4);
    e4.setVolume(level4);
    e5.setVolume(level4);
  }

  //translate(100, 0); 
  fill(75);
  strokeWeight(2);
  triangle(395, possssY+5, 395, possssY-5, 385, possssY);
  var out = map(possssY, 160, 50, -70, 6);
  var outintFour = int(out);
  textSize(16);
  strokeWeight(1);
  stroke(255);
  text(outintFour, 370, 185);
  stroke(125);
  strokeWeight(4);
  fill(125);
  line(378, 60, 382, 60);
  connectFour = outintFour;
}
function Button() {
  strokeWeight(2);
  stroke(150);
  fill(redbutton);
  rect(520, 100, 70, 70);
  strokeWeight(2);
  stroke(255);
  textSize(12);
  fill(50);
  text("click here", 530, 120);
  text("for", 550, 140);
  text("automation", 525, 160);
}

  function mousePressed(){
  var flagC, flagD, flagP, flagQ;
  
  if (mouseX > 520 && mouseX < 590 && call == 0) { 
    flagC = true;
  }
  
  if (mouseY > 100 && mouseY < 170) { 
    flagD = true;
  }

  if (flagC && flagD) { 
    redbutton = [204, 0, 0, 150];
    silentsound.play();
    call = 1;
  }  else {
  	autoOff()
  }

  if (mouseX > 900 && mouseX < 950) { 
    flagP = true;
  }
  
  if (mouseY > 150 && mouseY < 200) { 
    flagQ = true;
  }

  if (flagP && flagQ && filteron == 0) {
  //print("This works!");
  myFilter();
  filterbutton = [204, 0, 0, 150];
  } else {
  FilterOff();
  }
}

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

function autoOff() {
	 if (mouseX > 520 && mouseX < 590 && mouseY > 100 && mouseY < 170 && call == 1) { 
	redbutton = [76, 153, 0, 150];
    silentsound.stop();
    call = 0;
    }
}

function myFilter() {
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
  e4.disconnect();
  e4.connect(filter);
  e5.disconnect();
  e5.connect(filter);
  filteron = 1; 
}

function FilterOff() {

  if (mouseX > 900 && mouseX < 950 && mouseY > 150 && mouseY < 200 && filteron == 1 && mouseIsPressed) {   
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
  e4.disconnect();
  e4.connect();
  e5.disconnect();
  e5.connect();
  filterbutton = [76, 153, 0, 150];
  filteron = 0;
  } 
}

function drawFilter() {
  textSize(14);
  text("Sound Spectrum", 545, 195);
     fill(0);
rect(500, 200, 200, 150);
var scmse = map(mouseX, 500, 700, 500, 940); 
  var freq = map(scmse, 500, 700, 10, 10000); // was 500, 700, 20, 10000
  constrain(freq, 10, 10000);
  filter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  filter.res(18);//was 50

  // draw filtered spectrum
  fill(255, 40, 255);
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 500, 700);
    var h = -150 + map(spectrum[i], 0, 255, 150, 0);
    rect(x, 350, 200/spectrum.length, h);
  }
}
