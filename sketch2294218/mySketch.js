//Modified from the original to produce sentances that break the brain.  These are now produced such that the color is randomized, but only if it meets conventions for contrast compliance with accessibility guidelines.  
//Andrew L. Smith - DHSI Project - 6 June 2024

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
}

function draw() {
  // This overlay will always take us back to black - try changing it
  // The alpha of 3 controls the speed of the fade - try raising and lowering it
  // This moves the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
  background(50, 50, 50, 50);
}

// This draws the word with each mouse click
function mouseClicked() {
  var grammar = tracery.createGrammar(grammarSource); // set up tracery library
  grammar.addModifiers(tracery.baseEngModifiers); // set up English grammar properly (capitals and a/an)
  var output = grammar.flatten("#origin#"); // creates sentence from grammar source
  let p = new Particle(mouseX, mouseY, output);
  particles.push(p);
}

// grammarSource is generated using:
// http://tracery.io/
// See the tutorial here: http://www.crystalcodepalace.com/traceryTut.html
var grammarSource = {
  "origin": [
    "If it hadn't been for #thing#, I wouldn't have #result#.",
    "Without #thing#, I wouldn't have #result#.",
    "Thanks to #thing#, I ended up #result#.",
    "Had it not been for #thing#, I wouldn't have #result#.",
    "Because of #thing#, I managed to #result#.",
    "If #thing# hadn't happened, I wouldn't have #result#.",
    "Due to #thing#, I found myself #result#.",
    "If #thing# wasn't there, I wouldn't have #result#.",
    "Owing to #thing#, I ended up #result#."
  ],
  "thing": [
    "my horse",
    "the rain",
    "that book",
    "my friend",
    "the internet",
    "my cat",
    "the traffic",
    "that mistake",
    "the coffee",
    "the alarm clock",
    "my bicycle",
    "the broken elevator",
    "the surprise party",
    "the lost wallet",
    "the old photograph",
    "the random encounter",
    "the unexpected email",
    "the delayed flight",
    "the forgotten umbrella",
    "the street musician"
  ],
  "result": [
    "spent that year in college",
    "met my best friend",
    "found my passion",
    "learned to code",
    "traveled the world",
    "started my business",
    "written my novel",
    "discovered my talent",
    "gotten that job",
    "moved to this city",
    "learned to play the guitar",
    "adopted a pet",
    "started painting",
    "joined a sports team",
    "became a volunteer",
    "took up photography",
    "learned a new language",
    "started a blog",
    "became a mentor",
    "reconnected with an old friend"
  ]
};

class Particle {
  constructor(x, y, text) {
    // This sets the x value to mouse position
    this.x = x;
    // This keeps the y at mouse position
    this.y = y;
    // This sets the range of x movement - try limiting it to + or -
    this.vx = random(-1, 1);
    // This sets the range of y movement - try limiting it to + or -
    this.vy = random(-1, 1);
    // This sets the text size to be consistent
    this.size = random(15, 20);
    // This sets the current line to the particle
    this.text = text;
    // Generate random color values
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    // Ensure the color contrast meets accessibility guidelines
    this.ensureContrast();
  }

  ensureContrast() {
    // Calculate the contrast ratio
    let bgColor = color(50, 50, 50); // Background color
    let fgColor = color(this.r, this.g, this.b); // Foreground color
    let contrastRatio = this.calculateContrast(bgColor, fgColor);

    // If the contrast ratio is below the required threshold, adjust the color
    while (contrastRatio < 4.5) { // WCAG AA requires at least 4.5:1 for normal text
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
      fgColor = color(this.r, this.g, this.b);
      contrastRatio = this.calculateContrast(bgColor, fgColor);
    }
  }

  calculateContrast(bgColor, fgColor) {
    // Convert colors to luminance
    let bgLuminance = this.calculateLuminance(bgColor);
    let fgLuminance = this.calculateLuminance(fgColor);

    // Calculate contrast ratio
    let contrastRatio = (Math.max(bgLuminance, fgLuminance) + 0.05) / (Math.min(bgLuminance, fgLuminance) + 0.05);
    return contrastRatio;
  }

  calculateLuminance(c) {
    // Convert RGB to linear RGB
    let r = red(c) / 255;
    let g = green(c) / 255;
    let b = blue(c) / 255;

    r = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  finished() {
    // Change this to 255 if you reverse the fade
    return (this.width < 0 || this.width > windowWidth);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    noStroke();
    textSize(this.size);
    // Try any web safe font
    textFont("Courier");
    // This centers the text on the click
    textAlign(CENTER, CENTER);
    // Set the fill to the random color
    fill(this.r, this.g, this.b);
    // This positions the text
    text(this.text, this.x, this.y);
  }
}
