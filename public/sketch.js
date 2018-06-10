let socket;

let offset = 100;
let canvas_container = document.getElementById("canvas_container");

let chosen_color = 125;
let chosen_tool = "line";

function setup() {

    let canvas = createCanvas(canvas_container.clientWidth, windowHeight);
    canvas.parent("#canvas_container");
    background(255);

    socket = io.connect();
    socket.on('mouse', newDrawing);
    socket.on('refresh', refresh);

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
            tool: chosen_tool,
            color: chosen_color
        };

        socket.emit('mouse', data);

        // console.log(`mouse position when clicked : x = ${data.x}, y=${data.y} // px = ${data.px}, py=${data.py}}`)
        // console.log(`color chose n at that moment : r=${rr} g=${gg} b=${bb}`)
        drawing(chosen_tool, chosen_color);
        // draw();
    }
}

// function mouseDragged() {
//     console.log("Sendi ng : x-" + mouseX + " , y-" + mouseY);
// }

function drawing(tool, color) {

    if (tool == "line") {
        stroke(color);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    // noStroke();
    // ellipse(mouseX, mouseY, 30, 30);
}

function newDrawing(data) {

    stroke(data.color);
    // line(data.px, data.py, data.x, data.y);
    // noStroke();
    // fill(data.r, data.g, data.b);
    // ellipse(data.x, data.y, 30, 30);
    line(data.px, data.py, data.x, data.y);
}

function send_refresh() {
    refresh();
    socket.emit('refresh');
}

function refresh() {
    console.log("J'ai recu une demande de refresh de la part du serveur.");
    background(255);
}

function chose_color(value) {
    chosen_color = value;
}

function chose_weight(value) {
    if (value > 10 || value < 0.1) {
        value = 10;
    } 
    strokeWeight(value);
}

// Si la fenetre est redimentionnée :
function windowResized() {
    resizeCanvas(canvas_container.clientWidth, windowHeight);
    background(255);
}