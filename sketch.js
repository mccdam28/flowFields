var inc = 0.1;
var scl = 10;
var cols, rows;
var counter = 0;
var zoff = 0;

var fr;
var clicked = false;
var particles = [];
var clickCounter = 0;
var flowfield;
var roateCounter = 0;
function setup() 
{
  createCanvas(800, 800);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  //fr = createP('');
  
  //wave = new p5.Oscillator();
  //wave.setType('sine');
  //wave.freq(440);
  //wave.amp(0.2);
  //wave.start();
  
  flowfield = new Array(cols * rows);
  for(var i = 0; i < 500; i++)
    particles[i] = new Particle();
  background(255);
}
function draw() 
{
  counter++;
  //background(255);
  var yoff = 0;
  for (var y = 0; y < rows; y++) 
  {
    var xoff = 0;
    for (var x = 0; x < cols; x++) 
    {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(10);
      flowfield[index] = v;
      xoff += inc;
      stroke(0,50);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      //strokeWeight(1);
      //line(0, 0, scl, 0);
      pop();
    }
    yoff += inc;
    zoff += 0.0003;
  }
  for(var i = 0; i < particles.length; i++)
  {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  } 
}