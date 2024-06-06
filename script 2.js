function setup() {
  createCanvas(800, 600);
  background(255); // White background

  // Set stroke weight to a higher value
  strokeWeight(6); // Increased stroke weight by 300%

  // Triangle 1
  stroke('#ffc600'); // Yellow stroke
  fill('#193549'); // Cobalt blue fill
  triangle(100, 100, 150, 50, 200, 100);

  // Triangle 2
  stroke('#FF9D00'); // Orange stroke
  fill('#0D3A58'); // Off blue fill
  triangle(300, 100, 350, 50, 400, 100);

  // Triangle 3
  stroke('#2AFFDF'); // Mint stroke
  fill('#35434d'); // Dusty blue fill
  triangle(500, 100, 550, 50, 600, 100);

  // Rectangle 1
  stroke('#FB94FF'); // Pink stroke
  fill('#15232D'); // Dark blue fill
  rect(100, 200, 150, 100);

  // Rectangle 2
  stroke('#9EFFFF'); // Light blue stroke
  fill('#193549'); // Cobalt blue fill
  rect(300, 200, 200, 100);

  // Circle
  stroke('#ffc600'); // Yellow stroke
  fill('#0D3A58'); // Off blue fill
  circle(600, 250, 100);
}

function draw() {
  // No need to draw anything continuously
}
