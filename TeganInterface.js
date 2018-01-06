var ps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFrameRate(60);
  ps = new ParticleSystem(createVector(random(50, width/2.5), -10));
}

function draw() {
  background(51);
  noStroke();
  fill(115, 0, 230, 40);
  var rectSize = width/80;
  for(var i = 0; i < 9; i++){
   rectSize = rectSize + width/30;
    rect(0,0, rectSize, height);
  }

  // Apply gravity force to all Particles
  var gravity = createVector(0, 0.03);
  ps.applyForce(gravity);

  ps.addParticle();
  ps.run();

}
