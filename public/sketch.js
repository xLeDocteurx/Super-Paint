let socket;

let offset = 100;
let canvas_container = document.getElementById("canvas_container");

let chosen_color = 125;
let chosen_tool = "Line";
$(':button').click(function(){
    chosen_tool=$(this).val();
    console.log($(this).val());
});

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
    switch(tool){
        case "Line":
        stroke(color);
        line(mouseX, mouseY, pmouseX, pmouseY);
        break;
        case "Ellipse":
        stroke(color);
        ellipse(mouseX,mouseY,55,55);
        break;
        case "Arc":
        stroke(color);
        arc(mouseX, mouseY, 50, 50, 0, 60);
        break;
        case "Quad":
        stroke(color);
        quad(mouseX, mouseY, mouseX+20, mouseY+35, mouseX-30, mouseY-40);
        break;
    }
/*    if (tool == "Line") {
        stroke(color);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }if (tool =="Ellipse"){
        stroke(color);
        ellipse(mouseX,mouseY,55,55)
    }*/

    // noStroke();
    // ellipse(mouseX, mouseY, 30, 30);
}

function newDrawing(data) {
    stroke(data.color);
        switch(data.tool){
        case "Line":
        stroke(data.color);
        line(data.x, data.y, data.px, data.py);
        break;
        case "Ellipse":
        stroke(data.color);
        ellipse(data.x,data.y,55,55);
        break;
        case "Arc":
        stroke(data.color);
        arc(data.x, data.y, 50, 50, 0, 60);
        break;
        case "Quad":
        stroke(data.color);
        quad(data.x, data.y, data.x+20, data.y+35, data.x-30, data.y-40);
        break;
    }
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