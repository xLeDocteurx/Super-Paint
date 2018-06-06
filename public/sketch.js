let socket;

let offset = 100;

function setup() {

    createCanvas(500, 500);
    background(255);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
}

function draw() {
    stroke(0);
    if (mouseIsPressed === true) {
        // draw();
    }
}

function mouseDragged() {
    console.log("Sendi ng : x-" + mouseX + " , y-" + mouseY);

    let rr = Math.random() * 255;
    let gg = Math.random() * 255;
    let bb = Math.random() * 255;

    var data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        r: rr,
        g: gg,
        b: bb
    };

    socket.emit('mouse', data);
    draw(rr, gg, bb);
}

function draw(r, g, b) {

    // stroke(r, g, b);
    // line(mouseX, mouseY, pmouseX, pmouseY);
    noStroke();
    fill(r, g, b);    
    ellipse(mouseX, mouseY, 30, 30);
}

function newDrawing(data) {

    // stroke(data.r, data.g, data.b);
    // line(data.px, data.py, data.x, data.y);
    noStroke();
    fill(data.r, data.g, data.b);    
    ellipse(data.x, data.y, 30, 30);
}



// Si la fenetre est redimentionnée :

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     // background(255);
// }