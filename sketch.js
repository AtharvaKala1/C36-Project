var canvas;
var database;
var drawing = [];
var path = []

function setup(){
    createCanvas(700,700);
    //canvas.parent('canvascontainer');
    database = firebase.database();

    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

    var ref = database.ref('drawings');
    ref.on('value',gotData,errData);
}

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}


function draw(){
    background(0);
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
        endShape();
    }
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        path = data.val().d
    })
}

function saveDrawing() {
    var aref = database.ref('drawings');
    var data = {
        name: "Atharva",
        drawing: drawing
    }
    var result = aref.push(data);
}

function gotData(data){
    var drawings = data.val();
    var keys = Object.keys(drawings);
    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        //console.log(key);
        var li = createElement('li',key);
        li.parent('drawingList');
    }


}

function errData(err){
console.log(err);
}