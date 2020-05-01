var canavs;
var database;
var clearButton;

var db_drawing = [];
var drawing = [];


function setup() {
    canvas = createCanvas(800, 500);
    canvas.parent('canvascontainer');
    database = firebase.database();
   
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(changeBG);

  clearButton = createButton("clear Drawing");
  clearButton.position(50,550);
  clearButton.mousePressed(cl);
}

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
   drawing.push(point);
   var drawingRef = database.ref('drawing');
    drawingRef.set({
        "d": drawing 
    })
}


function draw() {
    readData();
   
    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
        }
 
         
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d;
    })
}

function changeBG() {
     clear();
  background('red');
   }

   function cl(){
       clear();
      db_drawing = [];
      drawing = [];
       background('rgb(0,255,0)');
   }


