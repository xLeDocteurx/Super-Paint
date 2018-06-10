let socket;

let offset = 100;
let canvas_container = document.getElementById("canvas_container");

let chosen_color = 125;
let chosen_tool = "Line";
let third_part= 50;
let fourth_part=50;
$(':button').click(function(){
    chosen_tool=$(this).val();
});
$('.three').submit(function(){
    dieu_t=Number($('#three').val());
    if(isNaN(dieu_t)){
        alert('veuillez rentrer un nombre uniquement')
    }else {
        third_part=dieu_t
    }
});
$('.four').submit(function(){
    deesse_t=Number($('#four').val());
    if(isNaN(deesse_t)){
        alert('Entrez uniquement un nombre !')
    }else {
        fourth_part=deesse_t;
    }
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
            color: chosen_color,
            g: third_part,
            u: fourth_part
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
        arc(mouseX, mouseY, 50, 50, third_part, fourth_part);
        break;
        case "Quad":
        stroke(color);
        quad(mouseX, mouseY, mouseX+20, mouseY+35, mouseX-30, mouseY-40,mouseX+40,mouseY-59);
        break;
        case "Rekt"://Il faut rigoler dans la vie 
        rect(mouseX-50,mouseY-28,third_part,fourth_part)
        break;
        case "Triangle":
        triangle(mouseX-15, mouseY-15, mouseX+15, mouseY-15, mouseX, mouseY+15);
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
        arc(data.x, data.y, 50, 50, data.g, data.u);
        break;
        case "Quad":
        stroke(data.color);
        quad(data.x, data.y, data.x+20, data.y+35, data.x-30, data.y-40,data.x+40,data.y-59);
        break;
        case "Rekt"://Il faut rigoler dans la vie 
        rect(data.x-50,data.y-28,data.g,data.u)
        break;
        case "Triangle":
        triangle(data.x-15, data.y-15, data.x+15, data.y-15, data.x, data.y+15);
        break;
    }
}

function send_refresh() {
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