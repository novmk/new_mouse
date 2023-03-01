// clmtrackr + p5 basic exmaple. Face Tracking example created by Kyle McDonald revised by Xin Xin, 2020
// https://kylemcdonald.github.io/cv-examples/

let capture;
let tracker;
let positions;

function setup() {
  
    // load p5 functions:
    createCanvas(windowWidth, windowHeight);
  
    capture = createCapture(VIDEO);
    capture.elt.setAttribute('playsinline', ''); // this line makes your program works on iPhone 11

    capture.size(width, height);
    capture.hide();

    // load clmtrackr functions:
    tracker = new clm.tracker(); // create a new clmtrackr object
    tracker.init(); // initialize the object
    tracker.start(capture.elt); // start tracking the video element capture.elt
}

function draw() {
    image(capture, 0, 0, width, height);
    let positions = tracker.getCurrentPosition(); // updates the tracker with current positions

    console.log(positions); // uncomment to see the list of arrays
  
    // draw face outline
  
    noFill();
    stroke(255);
  
    beginShape();
    for (let i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    // draw dots + numbers
	noStroke();
	for (let i = 0; i < positions.length; i++) {
	  fill(0, 255, 0);
	  ellipse(positions[i][0], positions[i][1], 4, 4);
	  text(i, positions[i][0], positions[i][1]);
	}

	// add circle on nose
	if (positions.length > 0) {
	  noStroke();
	  fill(0, 255, 255);
	  ellipse(positions[62][0], positions[62][1], 50, 50);
	}

	// draw dots + numbers
	  noStroke();
	  for (let i = 0; i < positions.length; i++) {
	    fill(0, 255, 0);
	    ellipse(positions[i][0], positions[i][1], 4, 4);
	    text(i, positions[i][0], positions[i][1]);
	  }
	  
	    if (positions.length > 0) {
	      let mouthLeft = createVector(positions[44][0], positions[44][1]);
	      let mouthRight = createVector(positions[50][0], positions[50][1]);
	      let smile = mouthLeft.dist(mouthRight);
	      print(smile);
	      
	    // smile bar
	    rect(20, 20, smile * 3, 20);
	}
}