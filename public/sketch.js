let socket;

let offset = 100;
let canvas_container = document.getElementById("canvas_container");

let rr;
let gg;
let bb;

function setup() {

    let canvas = createCanvas(canvas_container.clientWidth, windowHeight);
    canvas.parent("#canvas_container");
    background(255);

    socket = io.connect();
    socket.on('mouse', newDrawing);

    strokeWeight(4);
}

function draw() {

    if (mouseIsPressed === true) {

        // let rr = 125;
        // let gg = 125;
        // let bb = 125;

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

        // console.log(`mouse position when clicked : x = ${data.x}, y=${data.y} // px = ${data.px}, py=${data.py}}`)
        // console.log(`color chose n at that moment : r=${rr} g=${gg} b=${bb}`)
        drawing(rr, gg, bb);
        // draw();
    } else {

        console.log(`Ready to rumble colors : `);
        rr = Math.random() * 255;
        gg = Math.random() * 255;
        bb = Math.random() * 255;
    }
}

// function mouseDragged() {
//     console.log("Sendi ng : x-" + mouseX + " , y-" + mouseY);


// }

function drawing(r, g, b) {

    stroke(r, g, b);
    // noStroke();
    // fill(r, g, b);
    // ellipse(mouseX, mouseY, 30, 30);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function newDrawing(data) {

    stroke(data.r, data.g, data.b);
    // line(data.px, data.py, data.x, data.y);
    // noStroke();
    // fill(data.r, data.g, data.b);
    // ellipse(data.x, data.y, 30, 30);
    line(data.px, data.py, data.x, data.y);
}



// Si la fenetre est redimentionnée :

function windowResized() {
    resizeCanvas(canvas_container.clientWidth, windowHeight);
    background(255);
}