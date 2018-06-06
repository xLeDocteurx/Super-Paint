var offset = 100;

function setup() {

    createCanvas(500, 500);
    background(255);
}

function draw() {
    stroke(0);
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
        // rect(mouseX, mouseY,20,10);
        // fill(0);
        console.log('drawing a line at : ', mouseX, mouseY);
    }
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     // background(255);
// }