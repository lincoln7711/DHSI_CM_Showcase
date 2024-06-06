// Variables to store the ball's position and velocity
let ballX, ballY;
let ballSpeedX, ballSpeedY;
let ballColor;

function setup() {
  createCanvas(500, 600); // Create a canvas of 800x600 pixels
  ballX = width / 2; // Initialize ball's x position at the center of the canvas
  ballY = height / 2; // Initialize ball's y position at the center of the canvas
  ballSpeedX = random(10); // Set the ball's horizontal speed
  ballSpeedY = random(10); // Set the ball's vertical speed
  ballColor = color(random(255), random(255), random(255)); // Initialize ball's color to a random color
}

function draw() {
  background(0); // Set the background color to black

  // Update the ball's position based on its speed
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collision with the canvas edges and reverse direction if needed
  // Also change the ball's color to a random color upon collision
  if (ballX > width || ballX < 0) {
    ballSpeedX *= -1; // Reverse horizontal direction
    ballColor = color(random(255), random(255), random(255)); // Change to a random color
  }
  if (ballY > height || ballY < 0) {
    ballSpeedY *= -1; // Reverse vertical direction
    ballColor = color(random(255), random(255), random(255)); // Change to a random color
  }

  // Set the fill color to the current ball color
  fill(ballColor);
  noStroke(); // Disable the stroke

  // Draw the ball
  ellipse(ballX, ballY, 50, 50); // Draw an ellipse at the ball's position with a diameter of 50

  // Display the frame count on the canvas
  fill(255); // Set the fill color to white
  textSize(16); // Set the text size
  text("Frame Count: " + frameCount, 10, 20); // Display the frame count at the top-left corner
}
