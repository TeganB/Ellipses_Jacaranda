// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

var Particle = function(position) {
  this.acceleration = createVector(0, 0.1);
  this.velocity = createVector(random(-1, 3), random(-5, 0));
  this.position = createVector(random(10, width/2), 0);
  this.lifespan = 500.0;
  this.mass = 1.5; // Let's do something better here!

  this.run = function(w) {
    this.wind = w;
    this.update();
    this.display();
  };

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  };

  // Method to update position
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 1.0;
  };

  // Method to display
  this.display = function() {
    //stroke(200);
    //strokeWeight(4);
    fill(41, 0, 102, 200);
    ellipse(this.position.x*this.wind, this.position.y*(this.wind*2)+2, 5,7);
    fill(173, 10, 220, 200);
    ellipse(this.position.x*this.wind, this.position.y*(this.wind*2), 9,7);
  };

   // Is the particle still useful?
  this.isDead = function() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  };
};
