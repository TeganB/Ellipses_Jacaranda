// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

var Particle = function(position) {
  this.acceleration = createVector(0, 0.1);
  this.velocity = createVector(random(-1, 3), random(-5, 0));
  this.position = createVector(random(10, width), 0);
  this.lifespan = 800.0;
  this.mass = 2; // Let's do something better here!

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
    strokeWeight(4);
    //stroke(41, 0, 102);
    //line(this.position.x*this.wind, this.position.y*(this.wind*2), this.position.x*this.wind+10, this.position.y*(this.wind*2)+5);
    stroke(115, 80, 230);
    line(this.position.x*this.wind-2, this.position.y*(this.wind*2), this.position.x*this.wind+5, this.position.y*(this.wind*2));
    strokeWeight(3);
    //stroke(197, 97, 225, 200);
    stroke(162, 35, 239, 200);
    line(this.position.x*this.wind, this.position.y*(this.wind*2), this.position.x*this.wind+8, this.position.y*(this.wind*2)+6);

    //line(this.position.x*this.wind, this.position.y*(this.wind*2), this.position.x*this.wind+8, this.position.y*(this.wind*2)+random(0,2));
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
