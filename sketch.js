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
    // image(capture, 0, 0, width, height);
    let positions = tracker.getCurrentPosition(); // updates the tracker with current positions

    // console.log(positions); // uncomment to see the list of arrays
  
    
	if (positions.length > 0) {
      // draw dots + numbers
      noStroke();
      for (let i = 0; i < positions.length; i++) {
        fill(0, 255, 0);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
      }
      
      // add circle on eye
	  noStroke();
	  fill(0, 0, 0);
      background(255, 255, 255);
	  ellipse(positions[27][0], positions[27][1] + 22, 54, 70);
	  ellipse(positions[32][0], positions[32][1] + 22, 54, 70); 
      
      // add lines on eyebrow
      noFill();
      stroke(0);
      strokeWeight(2);
      strokeCap(ROUND);
      strokeJoin(ROUND);
      
      beginShape();
      vertex(positions[19][0], positions[19][1]);
      vertex(positions[20][0], positions[20][1]);
      vertex(positions[21][0], positions[21][1]);
      vertex(positions[22][0], positions[22][1]);
      endShape();
      
      beginShape();
      vertex(positions[18][0], positions[18][1]);
      vertex(positions[17][0], positions[17][1]);
      vertex(positions[16][0], positions[16][1]);
      vertex(positions[15][0], positions[15][1]);
      endShape();
      
      beginShape();
      vertex(positions[23][0], positions[23][1]);
      vertex(positions[63][0], positions[63][1]);
      vertex(positions[24][0], positions[24][1]);
      vertex(positions[64][0], positions[64][1]);
      vertex(positions[25][0], positions[25][1]);
      endShape();
      
      beginShape();
      vertex(positions[30][0], positions[30][1]);
      vertex(positions[68][0], positions[68][1]);
      vertex(positions[29][0], positions[29][1]);
      vertex(positions[67][0], positions[67][1]);
      vertex(positions[28][0], positions[28][1]);
      endShape();
      
      // click event show
      let eyeLeftT = createVector(positions[29][0], positions[29][1]);
      let eyeLeftB = createVector(positions[68][0], positions[68][1]);
      let eyeLeftDist = eyeLeftB.y - eyeLeftT.y;
      // console.log(eyeLeftDist);
      if (eyeLeftDist > 1.2 && eyeLeftDist < 2.2) {
        stroke(0, 255, 0);
        strokeWeight(1);
        noFill();
        ellipse(mouseX, mouseY, 100, 100);
      }
      
      let eyeRightT = createVector(positions[24][0], positions[24][1]);
      let eyeRightB = createVector(positions[64][0], positions[64][1]);
      let eyeRightDist = eyeRightB.y - eyeRightT.y;
      // console.log(eyeRightDist);
      if (eyeRightDist > 1.2 && eyeRightDist < 2.2) {
        stroke(0, 0, 255);
        strokeWeight(1);
        noFill();
        ellipse(mouseX, mouseY, 100, 100);
      }
      
	}
}